#!/usr/bin/env node

/**
 * PDF Stempel-Generator (Illustrator -> PDF)
 *
 * Verwendet ein bestehendes Illustrator-exportiertes PDF als Hintergrund
 * und zeichnet dynamische Daten an exakten Koordinaten darüber.
 *
 * Nutzung:
 *   node generate-pdf.js [--template <path>] [--data <path>] [--output <path>] [--font <path>]
 *
 * Beispiel:
 *   node generate-pdf.js \
 *     --template "app/dashboard/auftraege/[id]/print/Produktionskarte Vorlage_caravan_prozessplanung_2022.pdf" \
 *     --data "./print-data.json" \
 *     --output "./prozessplanung-ausgabe.pdf"
 */

const fs = require('fs');
const path = require('path');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');

const DEFAULT_TEMPLATE = 'app/dashboard/auftraege/[id]/print/Produktionskarte Vorlage_caravan_prozessplanung_2022.pdf';
const DEFAULT_OUTPUT = 'prozessplanung-filled.pdf';

/**
 * Illustrator arbeitet oft in Millimetern.
 * PDF arbeitet in Punkten (pt), 72 pt = 1 inch.
 * 1 mm = 72 / 25.4 = 2.834645669... pt
 */
const MM_TO_PT = 72 / 25.4;

function mmToPt(mm) {
  return mm * MM_TO_PT;
}

/**
 * Optional: Falls Koordinaten aus einem Top-Left System kommen,
 * konvertiert diese Funktion auf PDF-Koordinaten (Bottom-Left).
 */
function topLeftMmToPdfPt({ xMm, yMm }, pageHeightPt) {
  return {
    x: mmToPt(xMm),
    y: pageHeightPt - mmToPt(yMm),
  };
}

function parseArgs(argv) {
  const result = {
    template: DEFAULT_TEMPLATE,
    data: null,
    output: DEFAULT_OUTPUT,
    font: null,
  };

  for (let i = 2; i < argv.length; i += 1) {
    const key = argv[i];
    const value = argv[i + 1];

    if (!value || value.startsWith('--')) continue;

    if (key === '--template') result.template = value;
    if (key === '--data') result.data = value;
    if (key === '--output') result.output = value;
    if (key === '--font') result.font = value;
  }

  return result;
}

function ensureFileExists(filePath, label) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`${label} nicht gefunden: ${filePath}`);
  }
}

/**
 * Beispiel für eine Koordinaten-Konfiguration.
 *
 * units:
 * - "pt": direkte PDF-Punkte (Nullpunkt unten links)
 * - "mmTopLeft": mm-Koordinaten aus einem Top-Left-Layout (z. B. Illustrator-Messwerte),
 *                werden intern auf PDF-Bottom-Left umgerechnet
 */
const FIELD_MAP = {
  auftragNummer: {
    x: mmToPt(22),
    y: mmToPt(262),
    size: 11,
    units: 'pt',
    color: rgb(0, 0, 0),
  },
  kundeName: {
    xMm: 22,
    yMm: 38,
    size: 10,
    units: 'mmTopLeft',
    color: rgb(0.1, 0.1, 0.1),
  },
  betragNetto: {
    xMm: 160,
    yMm: 250,
    size: 12,
    units: 'mmTopLeft',
    color: rgb(0, 0, 0),
  },
};

function resolveFieldPosition(fieldConfig, pageHeightPt) {
  if (fieldConfig.units === 'mmTopLeft') {
    return topLeftMmToPdfPt({ xMm: fieldConfig.xMm, yMm: fieldConfig.yMm }, pageHeightPt);
  }

  return { x: fieldConfig.x, y: fieldConfig.y };
}

async function loadFont(pdfDoc, customFontPath) {
  if (customFontPath) {
    ensureFileExists(customFontPath, 'Custom-Font-Datei');
    const fontBytes = fs.readFileSync(customFontPath);
    return pdfDoc.embedFont(fontBytes);
  }

  return pdfDoc.embedFont(StandardFonts.Helvetica);
}

async function generatePdf({ templatePath, dataPath, outputPath, customFontPath }) {
  ensureFileExists(templatePath, 'Template-PDF');

  const templateBytes = fs.readFileSync(templatePath);
  const templateDoc = await PDFDocument.load(templateBytes);

  if (templateDoc.getPageCount() < 1) {
    throw new Error('Template-PDF enthält keine Seiten.');
  }

  const overlayDoc = await PDFDocument.create();
  const [embeddedTemplatePage] = await overlayDoc.embedPages([templateDoc.getPage(0)]);

  const page = overlayDoc.addPage([embeddedTemplatePage.width, embeddedTemplatePage.height]);
  page.drawPage(embeddedTemplatePage, {
    x: 0,
    y: 0,
    width: embeddedTemplatePage.width,
    height: embeddedTemplatePage.height,
  });

  const font = await loadFont(overlayDoc, customFontPath);

  let data = {};
  if (dataPath) {
    ensureFileExists(dataPath, 'JSON-Daten-Datei');
    const rawJson = fs.readFileSync(dataPath, 'utf8');
    data = JSON.parse(rawJson);
  } else {
    data = {
      auftragNummer: 'A-2026-00123',
      kundeName: 'Max Mustermann GmbH',
      betragNetto: '12.345,67 €',
    };
  }

  const pageHeight = page.getHeight();

  Object.entries(FIELD_MAP).forEach(([fieldName, fieldConfig]) => {
    const value = data[fieldName];
    if (value === undefined || value === null || value === '') return;

    const { x, y } = resolveFieldPosition(fieldConfig, pageHeight);

    page.drawText(String(value), {
      x,
      y,
      size: fieldConfig.size ?? 10,
      font,
      color: fieldConfig.color ?? rgb(0, 0, 0),
    });
  });

  const outputBytes = await overlayDoc.save();
  fs.writeFileSync(outputPath, outputBytes);
}

(async function main() {
  try {
    const args = parseArgs(process.argv);

    await generatePdf({
      templatePath: path.resolve(args.template),
      dataPath: args.data ? path.resolve(args.data) : null,
      outputPath: path.resolve(args.output),
      customFontPath: args.font ? path.resolve(args.font) : null,
    });

    console.log('PDF erfolgreich erzeugt:', args.output);
    console.log('Hinweis: Feintuning der Positionen über FIELD_MAP anpassen (x/y oder xMm/yMm).');
  } catch (error) {
    console.error('Fehler beim PDF-Export:', error.message);
    process.exitCode = 1;
  }
})();
