const puppeteer = require('../frontend-prodeoptica/node_modules/puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = path.resolve(__dirname, '..', 'capturas');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  console.log('🚀 Iniciando Chrome para captura de portafolio en alta resolución (1680x1050 @2x)...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--window-size=1680,1050',
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1680, height: 1050, deviceScaleFactor: 2 });

  // 1. LOGIN
  console.log('📸 1/11 Capturando Inicio de Sesión...');
  await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle2' });
  await sleep(1500);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '01-inicio-sesion.png') });

  // Iniciar sesión
  console.log('🔑 Iniciando sesión como Administrador...');
  await page.type('input[type="text"]', 'admin');
  await page.type('input[type="password"]', 'admin');
  
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle2' }).catch(() => {}),
    page.click('button[type="submit"]'),
  ]);
  await sleep(2500);

  // 2. DASHBOARD EJECUTIVO
  console.log('📸 2/11 Capturando Dashboard Ejecutivo con Analítica...');
  await page.goto('http://localhost:3000/dashboard', { waitUntil: 'networkidle2' });
  await sleep(3500);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '02-dashboard-analitica.png') });

  // 3. MENU NAVEGACION (DRAWER LATERAL)
  console.log('📸 3/11 Capturando Menú de Navegación Lateral...');
  try {
    const menuBtn = await page.$('button[aria-label="Abrir menú"], header button:first-child');
    if (menuBtn) {
      await menuBtn.click();
      await sleep(1000);
      await page.screenshot({ path: path.join(OUTPUT_DIR, '10-menu-navegacion.png') });
      await menuBtn.click(); // Cerrar menú
      await sleep(500);
    }
  } catch (err) {
    console.log('Info menú:', err.message);
  }

  // 4. PUNTO DE VENTA (POS)
  console.log('📸 4/11 Capturando Punto de Venta (POS) con Carrito Activo...');
  await page.goto('http://localhost:3000/dashboard?tab=pos', { waitUntil: 'networkidle2' });
  await sleep(2500);
  
  try {
    const addButtons = await page.$$('button');
    for (const btn of addButtons) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text && text.includes('Agregar')) {
        await btn.click();
        await sleep(500);
        break;
      }
    }
  } catch (err) {}
  await sleep(1500);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '03-punto-de-venta-pos.png') });

  // 5. INVENTARIO Y CATÁLOGO
  console.log('📸 5/11 Capturando Catálogo de Inventario...');
  await page.goto('http://localhost:3000/inventario', { waitUntil: 'networkidle2' });
  await sleep(2500);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '04-inventario-catalogo.png') });

  // 6. HISTORIA CLÍNICA Y REFRACCIÓN OPTOMÉTRICA
  console.log('📸 6/11 Capturando Ficha Médica y Refracción...');
  await page.goto('http://localhost:3000/ficha-medica', { waitUntil: 'networkidle2' });
  await sleep(2000);
  
  try {
    const ciInput = await page.$('input[placeholder*="0102030405"]');
    if (ciInput) {
      await ciInput.type('1720345678');
      await sleep(500);
      const searchBtns = await page.$$('button');
      for (const b of searchBtns) {
        const text = await page.evaluate(el => el.textContent, b);
        if (text && text.includes('Buscar')) {
          await b.click();
          await sleep(1500);
          break;
        }
      }
    }
    
    // Cambiar a la pestaña de "Ficha Médica y Refracción"
    const tabBtns = await page.$$('button');
    for (const b of tabBtns) {
      const text = await page.evaluate(el => el.textContent, b);
      if (text && text.includes('Ficha Médica y Refracción')) {
        await b.click();
        await sleep(1500);
        break;
      }
    }
  } catch (err) {
    console.log('Info ficha refracción:', err.message);
  }
  await sleep(1500);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '05-ficha-medica-optometria.png') });

  // 7. HISTORIAL CLÍNICO DEL PACIENTE
  console.log('📸 7/11 Capturando Historial Clínico del Paciente...');
  try {
    const tabBtns = await page.$$('button');
    for (const b of tabBtns) {
      const text = await page.evaluate(el => el.textContent, b);
      if (text && text.includes('Historial Clínico')) {
        await b.click();
        await sleep(1500);
        break;
      }
    }
    await page.screenshot({ path: path.join(OUTPUT_DIR, '05b-historial-clinico-paciente.png') });
  } catch (err) {
    console.log('Info historial clínico:', err.message);
  }

  // 8. KARDEX VALORIZADO CON PRODUCTO AUDITADO (SIN MODAL BLOQUEANTE)
  console.log('📸 8/11 Capturando Kardex de Movimientos Valorizados...');
  await page.goto('http://localhost:3000/kardex', { waitUntil: 'networkidle2' });
  await sleep(2000);

  try {
    const searchInput = await page.$('input[placeholder*="Armazón, Ray-Ban"]');
    if (searchInput) {
      await searchInput.type('Ray-Ban');
      await sleep(1000);
      const suggestion = await page.$('.group');
      if (suggestion) {
        await suggestion.click();
        await sleep(1500);
        
        // Cerrar el SweetAlert de confirmación si aparece
        const swalBtn = await page.$('.swal2-confirm');
        if (swalBtn) {
          await swalBtn.click();
          await sleep(1000);
        }
      }
    }
  } catch (err) {
    console.log('Info kardex:', err.message);
  }
  await sleep(1500);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '06-kardex-movimientos.png') });

  // 9. GESTIÓN DE ABONOS Y COBRANZAS (CON NOMBRES DE CLIENTES)
  console.log('📸 9/11 Capturando Cuentas por Cobrar y Abonos...');
  await page.goto('http://localhost:3000/abonos', { waitUntil: 'networkidle2' });
  await sleep(2500);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '07-gestion-abonos-creditos.png') });

  // 10. INGRESOS Y COMPRAS A PROVEEDORES (FORMULARIO CON DATOS)
  console.log('📸 10/11 Capturando Registro de Ingreso de Mercadería...');
  await page.goto('http://localhost:3000/ingresos', { waitUntil: 'networkidle2' });
  await sleep(2000);

  try {
    const prodInput = await page.$('input[placeholder*="Buscar producto"]');
    if (prodInput) {
      await prodInput.type('Armazón Carrera 8824 Titanium');
      await sleep(800);
      const item = await page.$('ul li');
      if (item) {
        await item.click();
        await sleep(500);
      }
    }

    const inputs = await page.$$('input');
    for (const inp of inputs) {
      const ph = await page.evaluate(el => el.getAttribute('placeholder'), inp);
      if (ph && ph.includes('001-002-12345')) {
        await inp.type('FAC-2026-0892 - Reposición Lote Importación');
      }
    }
  } catch (err) {}
  await sleep(1500);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '08-ingreso-mercaderia.png') });

  // 11. CRUD / ADMINISTRACIÓN (TABLA PROVEEDORES)
  console.log('📸 11/11 Capturando Módulo de Administración (Tabla Proveedores)...');
  await page.goto('http://localhost:3000/CRUD', { waitUntil: 'networkidle2' });
  await sleep(2000);

  try {
    const cards = await page.$$('.cursor-pointer');
    for (const c of cards) {
      const text = await page.evaluate(el => el.textContent, c);
      if (text && text.includes('Proveedores')) {
        await c.click();
        await sleep(2000);
        break;
      }
    }
  } catch (err) {}
  await sleep(1500);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '09-administracion-crud.png') });

  await browser.close();
  console.log('✨ ¡Todas las capturas de calidad profesional fueron generadas con éxito en /capturas!');
}

run().catch((err) => {
  console.error('❌ Error capturando pantallas:', err);
  process.exit(1);
});
