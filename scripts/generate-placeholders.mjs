// One-shot generator for the eight DENSITY placeholder images.
// Run with: node scripts/generate-placeholders.mjs
// Replace the produced JPGs with the real artwork when ready.
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve("public/images/density");
await mkdir(OUT, { recursive: true });

// Shared SVG fragments ---------------------------------------------------------
const DEFS = `
  <defs>
    <linearGradient id="goldText" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#B8941F"/>
      <stop offset="35%" stop-color="#F5E6B8"/>
      <stop offset="65%" stop-color="#D4AF37"/>
      <stop offset="100%" stop-color="#B8941F"/>
    </linearGradient>
    <linearGradient id="goldFill" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#F5E6B8"/>
      <stop offset="50%" stop-color="#D4AF37"/>
      <stop offset="100%" stop-color="#B8941F"/>
    </linearGradient>
    <linearGradient id="darkBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0F0E0A"/>
      <stop offset="100%" stop-color="#1B170E"/>
    </linearGradient>
    <linearGradient id="creamBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FBF6E3"/>
      <stop offset="100%" stop-color="#F1E6C4"/>
    </linearGradient>
    <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#D4AF37" stop-opacity="0.35"/>
      <stop offset="70%" stop-color="#D4AF37" stop-opacity="0"/>
    </radialGradient>
    <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
`;

const STREAKS = `
  <g opacity="0.55" stroke="url(#goldFill)" fill="none" stroke-width="1.2">
    <path d="M -80 380 C 320 240 920 580 1500 420"/>
    <path d="M -80 520 C 280 380 1020 660 1500 500"/>
    <path d="M -80 220 C 420 120 940 380 1500 240"/>
  </g>
`;

// Device silhouette (DENSITY console)
const device = (cx, cy, scale = 1) => {
  const w = 220 * scale;
  const h = 360 * scale;
  const x = cx - w / 2;
  const y = cy - h / 2;
  return `
    <g transform="translate(${x},${y})">
      <ellipse cx="${w / 2}" cy="${h + 8}" rx="${w / 2 + 20}" ry="14" fill="url(#goldGlow)"/>
      <rect x="${w * 0.06}" y="0" width="${w * 0.88}" height="${h * 0.92}" rx="36" fill="url(#darkBg)" stroke="url(#goldFill)" stroke-width="1.4"/>
      <rect x="${w * 0.16}" y="${h * 0.06}" width="${w * 0.68}" height="${h * 0.48}" rx="14" fill="#000"/>
      <circle cx="${w / 2}" cy="${h * 0.30}" r="${w * 0.14}" fill="none" stroke="url(#goldFill)" stroke-width="1.5"/>
      <text x="${w / 2}" y="${h * 0.32}" fill="url(#goldText)" font-family="Cormorant Garamond, serif" font-size="${14 * scale}" text-anchor="middle" font-weight="700" letter-spacing="2">DENSITY</text>
      <text x="${w / 2}" y="${h * 0.52}" fill="#9c8a55" font-family="Inter, sans-serif" font-size="${7 * scale}" text-anchor="middle" letter-spacing="3">TOUCH TO START</text>
      <rect x="${w * 0.22}" y="${h * 0.62}" width="${w * 0.56}" height="${h * 0.18}" rx="8" fill="url(#goldFill)"/>
      <rect x="${w * 0.30}" y="${h * 0.66}" width="${w * 0.18}" height="${h * 0.10}" rx="4" fill="#1B170E"/>
      <path d="M ${w * 0.55} ${h * 0.66} L ${w * 0.62} ${h * 0.78} L ${w * 0.78} ${h * 0.74}" stroke="#ffffff" stroke-width="2" fill="none"/>
    </g>
  `;
};

// Generic frame wrapper
const frame = (W, H, inner) => `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
    ${DEFS}
    ${inner}
  </svg>
`;

// 01 — Features (device + 4 right-side pills)
const svg01 = () => {
  const W = 1600, H = 900;
  return frame(W, H, `
    <rect width="${W}" height="${H}" fill="url(#creamBg)"/>
    ${STREAKS}
    ${device(420, 460, 1.4)}
    <g font-family="Noto Serif TC, serif" fill="#1B170E">
      <text x="1080" y="180" font-size="68" fill="url(#goldText)" font-weight="700" letter-spacing="6">DENSITY</text>
      <text x="1330" y="180" font-size="60" font-weight="600">技術特點</text>
      <line x1="980" y1="220" x2="1500" y2="220" stroke="#D4AF37" stroke-width="1.4"/>
    </g>
    <g font-family="Noto Sans TC, sans-serif">
      ${[
        "市場唯一 單極 x 雙極專利技術",
        "五階可調式冷卻系統",
        "突破性探頭技術",
        "即時而明顯的效果",
      ].map((zh, i) => {
        const y = 320 + i * 130;
        return `
          <rect x="900" y="${y}" width="640" height="100" rx="50" fill="#ffffff" stroke="#D4AF37" stroke-width="1.4"/>
          <circle cx="960" cy="${y + 50}" r="32" fill="url(#goldFill)"/>
          <text x="1020" y="${y + 50}" font-size="34" font-weight="700" fill="#1B170E" font-family="Noto Serif TC, serif">${zh}</text>
          <text x="1020" y="${y + 80}" font-size="14" fill="#7a6b3f" letter-spacing="2">DENSITY · IM Infinity Medical</text>
        `;
      }).join("")}
    </g>
  `);
};

// 02 — Tips & issues (Classic / High + portrait + bullets)
const svg02 = () => {
  const W = 1200, H = 1600;
  const tipBox = (y, label, sub) => `
    <rect x="80" y="${y}" width="1040" height="280" rx="36" fill="#ffffff" stroke="#D4AF37" stroke-width="1.2"/>
    <rect x="130" y="${y + 80}" width="160" height="110" rx="12" fill="#0F0E0A" stroke="url(#goldFill)" stroke-width="1.6"/>
    <rect x="155" y="${y + 100}" width="110" height="70" rx="6" fill="url(#goldFill)"/>
    <rect x="380" y="${y + 60}" width="500" height="60" rx="30" fill="url(#creamBg)" stroke="#D4AF37"/>
    <text x="630" y="${y + 100}" font-family="Cormorant Garamond, serif" font-size="32" font-weight="700" fill="url(#goldText)" text-anchor="middle" letter-spacing="6">${label}</text>
    <text x="380" y="${y + 170}" font-family="Noto Sans TC, sans-serif" font-size="18" fill="#3a3528">${sub}</text>
    <text x="380" y="${y + 200}" font-family="Noto Sans TC, sans-serif" font-size="18" fill="#3a3528">DENSITY · IM Infinity Medical</text>
  `;
  return frame(W, H, `
    <rect width="${W}" height="${H}" fill="url(#creamBg)"/>
    ${STREAKS}
    ${tipBox(80, "CLASSIC TIP", "經典探頭 · 僅發射單極高頻能量")}
    ${tipBox(420, "HIGH TIP", "高頻探頭 · 單極 x 雙極高頻能量系統")}
    <!-- Portrait circle -->
    <g transform="translate(80, 820)">
      <circle cx="280" cy="280" r="280" fill="url(#goldGlow)"/>
      <circle cx="280" cy="280" r="240" fill="#e6c79b"/>
      <ellipse cx="280" cy="170" rx="100" ry="120" fill="#3d2a1a"/>
      <rect x="180" y="240" width="200" height="280" fill="#e6c79b"/>
      <circle cx="280" cy="280" r="240" fill="none" stroke="url(#goldFill)" stroke-width="2"/>
      <!-- lift arrows -->
      <g stroke="#ffffff" stroke-width="3" fill="none" opacity="0.9">
        <path d="M 100 280 C 180 240 220 240 280 200"/>
        <path d="M 100 320 C 180 290 220 290 280 260"/>
        <path d="M 100 360 C 180 340 220 340 280 320"/>
      </g>
    </g>
    <!-- improvement issues -->
    <g transform="translate(680, 900)" font-family="Noto Serif TC, serif" fill="#1B170E">
      <text x="0" y="0" font-size="58" font-weight="700">改善問題</text>
      <line x1="0" y1="30" x2="220" y2="30" stroke="#D4AF37" stroke-width="1.6"/>
      ${[
        "臉部輪廓線模糊、嘴邊肉、法令紋、木偶紋",
        "眼周細紋、眼皮鬆弛、泡泡眼、提升眼神",
        "身體鬆弛、橙皮組織（腹部、手臂等）",
        "毛孔粗大、膚質暗沉",
      ].map((line, i) => `
        <g transform="translate(0, ${110 + i * 90})">
          <text x="0" y="0" font-size="28" fill="#D4AF37">◆</text>
          <text x="40" y="0" font-size="22" font-family="Noto Sans TC, sans-serif" fill="#3a3528">${line}</text>
        </g>
      `).join("")}
    </g>
  `);
};

// 03 — Benefits hero (device + 6 ring badges)
const svg03 = () => {
  const W = 1200, H = 1500;
  const benefits = [
    { x: 200, y: 480, label: "改善\n皮膚鬆弛" },
    { x: 200, y: 750, label: "減少皺紋" },
    { x: 200, y: 1020, label: "亮白肌膚\n減少泛紅" },
    { x: 1000, y: 480, label: "膠原蛋白\n增生" },
    { x: 1000, y: 750, label: "即時\n輪廓提升" },
    { x: 1000, y: 1020, label: "低痛感" },
  ];
  return frame(W, H, `
    <rect width="${W}" height="${H}" fill="url(#creamBg)"/>
    ${STREAKS}
    <g font-family="Noto Serif TC, serif" text-anchor="middle">
      <text x="${W / 2}" y="150" font-size="28" fill="#9c8a55" letter-spacing="14">高 端 緊 緻 提 拉 科 技</text>
      <text x="${W / 2}" y="290" font-size="160" font-weight="700" fill="url(#goldText)" letter-spacing="8">無雙電波</text>
    </g>
    ${device(W / 2, 850, 1.5)}
    <g font-family="Noto Sans TC, sans-serif" text-anchor="middle">
      ${benefits.map((b) => {
        const lines = b.label.split("\n");
        return `
          <circle cx="${b.x}" cy="${b.y}" r="105" fill="#ffffff" stroke="url(#goldFill)" stroke-width="2.2" filter="url(#softGlow)"/>
          <circle cx="${b.x}" cy="${b.y - 30}" r="14" fill="url(#goldFill)"/>
          ${lines.map((ln, i) => `<text x="${b.x}" y="${b.y + 20 + i * 32}" font-size="26" font-weight="700" fill="#1B170E">${ln}</text>`).join("")}
        `;
      }).join("")}
    </g>
    <text x="${W / 2}" y="${H - 60}" font-family="Noto Sans TC, sans-serif" font-size="22" fill="#9c8a55" letter-spacing="10" text-anchor="middle">專業醫療團隊 · 安心信賴之選</text>
  `);
};

// 04 — Spokesperson + stats
const svg04 = () => {
  const W = 1200, H = 1500;
  return frame(W, H, `
    <rect width="${W}" height="${H}" fill="url(#creamBg)"/>
    ${STREAKS}
    <!-- Portrait -->
    <g transform="translate(100, 220)">
      <circle cx="280" cy="380" r="380" fill="url(#goldGlow)"/>
      <ellipse cx="280" cy="300" rx="170" ry="220" fill="#e6c79b"/>
      <ellipse cx="280" cy="220" rx="180" ry="210" fill="#3a261a"/>
      <ellipse cx="280" cy="320" rx="150" ry="200" fill="#e6c79b"/>
      <rect x="120" y="490" width="320" height="280" fill="#d4b78a"/>
      <circle cx="280" cy="380" r="380" fill="none" stroke="url(#goldFill)" stroke-width="2.5"/>
    </g>
    <g font-family="Noto Serif TC, serif" text-anchor="end">
      <text x="${W - 80}" y="220" font-size="22" fill="#9c8a55" letter-spacing="6">品牌代言人 · 李英愛</text>
      <text x="${W - 80}" y="340" font-size="120" font-weight="700" fill="url(#goldText)">無雙電波</text>
      <text x="${W - 80}" y="430" font-size="56" font-weight="600" fill="#9c8a55" letter-spacing="14">DENSITY</text>
      <line x1="${W - 360}" y1="470" x2="${W - 80}" y2="470" stroke="#D4AF37"/>
    </g>
    ${device(900, 850, 0.85)}
    <!-- Stats -->
    <g font-family="Cormorant Garamond, serif" text-anchor="middle">
      ${["76%", "239%", "82%"].map((v, i) => {
        const labels = ["膠原纖維密度增加*", "膠原蛋白新生*", "彈性纖維密度增加*"];
        const x = 200 + i * 400;
        return `
          <text x="${x}" y="${H - 220}" font-size="100" font-weight="700" fill="url(#goldText)">${v}</text>
          <text x="${x}" y="${H - 170}" font-size="24" font-family="Noto Sans TC, sans-serif" fill="#3a3528">${labels[i]}</text>
        `;
      }).join("")}
    </g>
    <text x="${W / 2}" y="${H - 60}" font-family="Inter, sans-serif" font-size="16" fill="#7a6b3f" text-anchor="middle">*數據來源 · pmc.ncbi.nlm.nih.gov/articles/PMC8950306</text>
  `);
};

// 05 — Comparison (3 devices in row)
const svg05 = () => {
  const W = 1600, H = 1200;
  const compareBox = (x, label, isPrimary) => {
    const y = 380;
    return `
      ${isPrimary ? `<text x="${x}" y="${y - 30}" font-size="40" fill="url(#goldText)" text-anchor="middle">♛</text>` : ""}
      <ellipse cx="${x}" cy="${y + 380}" rx="180" ry="22" fill="url(#goldGlow)"/>
      ${device(x, y + 200, 1.05)}
      <rect x="${x - 100}" y="${y + 440}" width="200" height="50" rx="25" fill="url(#goldFill)"/>
      <text x="${x}" y="${y + 475}" font-family="Noto Serif TC, serif" font-size="26" font-weight="700" fill="#1B170E" text-anchor="middle">${label}</text>
    `;
  };
  return frame(W, H, `
    <rect width="${W}" height="${H}" fill="url(#creamBg)"/>
    ${STREAKS}
    <g font-family="Noto Sans TC, sans-serif" fill="#1B170E" text-anchor="middle">
      <text x="${W / 2}" y="120" font-size="36" font-weight="600">Density 專利黑科技與鳳凰電波有相同的功率強度</text>
      <text x="${W / 2}" y="180" font-size="32" font-weight="400" fill="#7a6b3f">比一般電波緊緻效果外還多了一個做完快速美肌的效果</text>
    </g>
    ${compareBox(400, "無雙電波", true)}
    ${compareBox(800, "Thermage", false)}
    ${compareBox(1200, "Ultherapy", false)}
    <text x="${W / 2}" y="${H - 80}" font-family="Noto Serif TC, serif" font-size="34" fill="url(#goldText)" text-anchor="middle" letter-spacing="14">精 準 能 量 · 深 淺 兼 顧 · 速 效 美 肌</text>
  `);
};

// 06 — Aging effects (timelines)
const svg06 = () => {
  const W = 1200, H = 1600;
  const phase = (x, y, head, body, dark) => `
    <rect x="${x}" y="${y}" width="220" height="170" rx="14" fill="${dark ? "#ffffff10" : "#ffffff"}" stroke="${dark ? "#D4AF37" : "#D4AF3760"}"/>
    <text x="${x + 110}" y="${y + 36}" font-family="Noto Serif TC, serif" font-size="22" font-weight="700" fill="${dark ? "#F5E6B8" : "#1B170E"}" text-anchor="middle">${head}</text>
    <line x1="${x + 50}" y1="${y + 50}" x2="${x + 170}" y2="${y + 50}" stroke="#D4AF37"/>
    <text x="${x + 110}" y="${y + 90}" font-family="Noto Sans TC, sans-serif" font-size="14" fill="${dark ? "#e3d5a9" : "#3a3528"}" text-anchor="middle">${body[0]}</text>
    <text x="${x + 110}" y="${y + 130}" font-family="Noto Sans TC, sans-serif" font-size="14" fill="${dark ? "#bcb190" : "#5a5238"}" text-anchor="middle">${body[1]}</text>
  `;
  return frame(W, H, `
    <rect width="${W}" height="${H}" fill="url(#creamBg)"/>
    ${STREAKS}
    <text x="${W / 2}" y="100" font-family="Noto Serif TC, serif" font-size="32" fill="#9c8a55" text-anchor="middle" letter-spacing="6">無雙電波 DENSITY</text>
    <!-- Classic block -->
    <g>
      <rect x="40" y="160" width="${W - 80}" height="520" rx="28" fill="#ffffff" stroke="url(#goldFill)" stroke-width="1.4"/>
      <text x="${W / 2}" y="240" font-family="Cormorant Garamond, serif" font-size="72" font-weight="700" fill="url(#goldText)" text-anchor="middle" letter-spacing="6">CLASSIC TIP</text>
      <text x="${W / 2}" y="295" font-family="Noto Serif TC, serif" font-size="28" fill="#1B170E" text-anchor="middle">單極逆齡效果</text>
      ${["即時效果", "一個月", "三個月後", "一年後"].map((h, i) => phase(
        80 + i * 270, 360, h,
        i === 0 ? ["現有膠原蛋白即時收縮", "面部即時收緊"]
        : i === 1 ? ["新生膠原蛋白持續合成", "肌膚開始緊致抗皺"]
        : i === 2 ? ["膠原質量達致高峰", "明顯減齡完全提升和緊緻"]
        : ["膠原狀態開始下降", "治療效果開始減弱"],
        false,
      )).join("")}
    </g>
    <!-- High block -->
    <g>
      <rect x="40" y="720" width="${W - 80}" height="540" rx="28" fill="url(#darkBg)" stroke="url(#goldFill)" stroke-width="1.6"/>
      <rect x="80" y="760" width="220" height="44" rx="22" fill="url(#goldFill)"/>
      <text x="190" y="790" font-family="Noto Serif TC, serif" font-size="20" font-weight="700" fill="#1B170E" text-anchor="middle">即極嫩膚效果</text>
      <text x="${W / 2}" y="850" font-family="Cormorant Garamond, serif" font-size="72" font-weight="700" fill="url(#goldText)" text-anchor="middle" letter-spacing="6">HIGH TIP</text>
      <text x="${W / 2}" y="905" font-family="Noto Serif TC, serif" font-size="28" fill="#F5E6B8" text-anchor="middle">單極 x 雙極逆齡效果</text>
      ${["即時效果", "一個月後", "三個月後", "十八個月後"].map((h, i) => phase(
        80 + i * 270, 970, h,
        i === 0 ? ["現有膠原蛋白即時收緊提升", "即時嫩膚效果"]
        : i === 1 ? ["新生膠原蛋白持續合成", "肌膚開始緊致抗皺"]
        : i === 2 ? ["膠原質量達致高峰", "明顯減齡 完全提升和緊緻"]
        : ["膠原狀態開始下降", "治療效果開始減弱"],
        true,
      )).join("")}
    </g>
    <!-- Temperature scale -->
    <g transform="translate(80, 1310)">
      <text x="0" y="0" font-family="Noto Serif TC, serif" font-size="22" fill="#9c8a55">次優的膠原蛋白 · 膠原蛋白變成 · 最優質的膠原蛋白</text>
      ${[
        { c: "30°C", bg: "#3b2310" },
        { c: "40°C", bg: "#5c331a" },
        { c: "50°C", bg: "#7e4221" },
        { c: "60°C", bg: "#9f5028" },
        { c: "75°C", bg: "url(#goldFill)", highlight: true },
        { c: "80°C", bg: "#c25a30" },
        { c: "90°C", bg: "#d65a35" },
      ].map((s, i) => `
        <rect x="${i * 150}" y="30" width="140" height="100" rx="8" fill="${s.bg}" stroke="${s.highlight ? "#D4AF37" : "none"}" stroke-width="${s.highlight ? "3" : "0"}"/>
        <text x="${i * 150 + 70}" y="90" font-family="Cormorant Garamond, serif" font-size="36" font-weight="700" fill="${s.highlight ? "#1B170E" : "#ffffff"}" text-anchor="middle">${s.c}</text>
        ${s.highlight ? `<text x="${i * 150 + 70}" y="22" font-family="Inter, sans-serif" font-size="14" font-weight="700" fill="#D4AF37" text-anchor="middle" letter-spacing="2">DENSITY</text>` : ""}
      `).join("")}
    </g>
  `);
};

// 07 — Handle anatomy
const svg07 = () => {
  const W = 1200, H = 1500;
  return frame(W, H, `
    <rect width="${W}" height="${H}" fill="url(#creamBg)"/>
    ${STREAKS}
    <!-- Handle -->
    <g transform="translate(440, 140)">
      <rect x="0" y="0" width="320" height="600" rx="60" fill="url(#darkBg)" stroke="url(#goldFill)" stroke-width="2"/>
      <rect x="40" y="40" width="240" height="100" rx="20" fill="#ffffff10" stroke="url(#goldFill)"/>
      <rect x="180" y="60" width="80" height="60" rx="8" fill="url(#goldFill)"/>
      <text x="200" y="100" font-family="Inter, sans-serif" font-size="20" fill="#1B170E" font-weight="700">+T</text>
      <text x="240" y="100" font-family="Inter, sans-serif" font-size="20" fill="#1B170E" font-weight="700">-S</text>
      <rect x="40" y="180" width="240" height="60" rx="14" fill="url(#goldFill)"/>
      <text x="160" y="220" font-family="Inter, sans-serif" font-size="22" fill="#1B170E" text-anchor="middle" font-weight="700">36.8°C · 26.8</text>
      <rect x="60" y="280" width="200" height="36" rx="8" fill="#ffffff10" stroke="url(#goldFill)"/>
      <circle cx="160" cy="380" r="50" fill="#ffffff" stroke="url(#goldFill)" stroke-width="2"/>
      <text x="160" y="395" font-family="Inter, sans-serif" font-size="20" font-weight="700" fill="#1B170E" text-anchor="middle">PULSE</text>
      <rect x="80" y="500" width="160" height="40" rx="20" fill="url(#goldFill)"/>
    </g>
    <!-- Callout pills -->
    <g font-family="Noto Sans TC, sans-serif">
      ${[
        { x: 60, y: 200, label: "手把調控", sub: "待機/治療模式" },
        { x: 60, y: 380, label: "脈衝切換", sub: "手動模式下可使用" },
        { x: 820, y: 200, label: "LED 展示", sub: "即時皮膚溫度 / 發數" },
        { x: 820, y: 380, label: "無雙探頭", sub: "三種選擇" },
      ].map((p) => `
        <rect x="${p.x}" y="${p.y}" width="320" height="80" rx="40" fill="#ffffff" stroke="url(#goldFill)" stroke-width="1.4"/>
        <text x="${p.x + 30}" y="${p.y + 36}" font-family="Noto Serif TC, serif" font-size="24" font-weight="700" fill="#1B170E">${p.label}</text>
        <text x="${p.x + 30}" y="${p.y + 64}" font-size="16" fill="#7a6b3f">${p.sub}</text>
      `).join("")}
    </g>
    <!-- Three tips -->
    <g transform="translate(0, 820)">
      ${[
        { x: 150, label: "H-EYE TIP", sub: "改善眼周細紋、泡泡眼、眼尾下垂", color: "#cbd9c6" },
        { x: 530, label: "H-FACE TIP", sub: "全臉拉提、緊緻、淡化法令紋", color: "#e6cfa3" },
        { x: 910, label: "H-BODY TIP", sub: "腹部、手臂、臀腿等大面積鬆弛", color: "#e9b487" },
      ].map((t) => `
        <rect x="${t.x}" y="0" width="160" height="170" rx="20" fill="${t.color}" stroke="url(#goldFill)" stroke-width="1.6"/>
        <rect x="${t.x + 30}" y="50" width="100" height="70" rx="6" fill="url(#goldFill)" opacity="0.85"/>
        <text x="${t.x + 80}" y="210" font-family="Cormorant Garamond, serif" font-size="26" font-weight="700" fill="url(#goldText)" text-anchor="middle" letter-spacing="3">${t.label}</text>
        <text x="${t.x + 80}" y="240" font-family="Noto Sans TC, sans-serif" font-size="14" fill="#3a3528" text-anchor="middle">${t.sub}</text>
      `).join("")}
    </g>
    <!-- Heating cross-section icon -->
    <g transform="translate(120, 1180)">
      <rect x="0" y="0" width="430" height="260" rx="16" fill="#f0d5a8" stroke="url(#goldFill)"/>
      <rect x="0" y="0" width="430" height="60" fill="#fff1d6"/>
      <rect x="0" y="60" width="430" height="100" fill="#f5cb98"/>
      <rect x="0" y="160" width="430" height="100" fill="#d99b6a"/>
      <rect x="180" y="0" width="70" height="60" rx="6" fill="url(#goldFill)"/>
      <rect x="170" y="60" width="90" height="180" rx="6" fill="url(#goldFill)" opacity="0.85"/>
      <text x="215" y="290" font-family="Noto Serif TC, serif" font-size="22" font-weight="700" fill="#1B170E" text-anchor="middle">絕對容積式加熱</text>
    </g>
    <g transform="translate(650, 1180)">
      <rect x="0" y="0" width="430" height="260" rx="16" fill="#f0d5a8" stroke="url(#goldFill)"/>
      <rect x="0" y="0" width="430" height="60" fill="#fff1d6"/>
      <rect x="0" y="60" width="430" height="100" fill="#f5cb98"/>
      <rect x="0" y="160" width="430" height="100" fill="#d99b6a"/>
      <rect x="180" y="0" width="70" height="60" rx="6" fill="url(#goldFill)"/>
      <path d="M 130 60 L 215 240 L 300 60 Z" fill="url(#goldFill)" opacity="0.5"/>
      <text x="215" y="290" font-family="Noto Serif TC, serif" font-size="22" font-weight="700" fill="#1B170E" text-anchor="middle">容積式加熱</text>
    </g>
  `);
};

// 08 — Aftercare (portrait + 3 cards)
const svg08 = () => {
  const W = 1300, H = 1300;
  return frame(W, H, `
    <rect width="${W}" height="${H}" fill="url(#creamBg)"/>
    ${STREAKS}
    <!-- portrait -->
    <g transform="translate(80, 220)">
      <circle cx="280" cy="380" r="380" fill="url(#goldGlow)"/>
      <ellipse cx="280" cy="240" rx="180" ry="220" fill="#3a261a"/>
      <ellipse cx="280" cy="340" rx="150" ry="210" fill="#e6c79b"/>
      <rect x="100" y="540" width="360" height="280" fill="#bfa37a"/>
      <circle cx="280" cy="380" r="380" fill="none" stroke="url(#goldFill)" stroke-width="2.5"/>
    </g>
    <g font-family="Noto Serif TC, serif" fill="#1B170E">
      <text x="700" y="280" font-size="100" font-weight="700" fill="url(#goldText)">無雙電波</text>
      <text x="700" y="360" font-size="40" font-weight="500" fill="#9c8a55" letter-spacing="14">DENSITY</text>
      <text x="700" y="450" font-size="44" font-weight="700">治療後注意事項</text>
      <line x1="700" y1="490" x2="900" y2="490" stroke="#D4AF37" stroke-width="1.4"/>
    </g>
    <g font-family="Noto Sans TC, sans-serif">
      ${[
        { i: 0, title: "加強保濕", body: "在治療一週後肌膚會較為乾燥，要加強保濕。" },
        { i: 1, title: "不擦酸類產品", body: "肌膚較脆弱，避免使用含酸類產品。" },
        { i: 2, title: "注意防曬", body: "出門時要塗抹防曬產品，避免刺激皮膚。" },
      ].map((c) => {
        const y = 540 + c.i * 130;
        return `
          <rect x="700" y="${y}" width="540" height="110" rx="20" fill="#ffffff" stroke="url(#goldFill)"/>
          <circle cx="760" cy="${y + 55}" r="32" fill="url(#goldFill)"/>
          <text x="820" y="${y + 50}" font-family="Noto Serif TC, serif" font-size="26" font-weight="700" fill="#1B170E">${c.title}</text>
          <text x="820" y="${y + 80}" font-size="16" fill="#5a5238">${c.body}</text>
        `;
      }).join("")}
    </g>
  `);
};

const FILES = [
  ["01-features.jpg", svg01()],
  ["02-tips-and-issues.jpg", svg02()],
  ["03-benefits-hero.jpg", svg03()],
  ["04-spokesperson.jpg", svg04()],
  ["05-comparison.jpg", svg05()],
  ["06-aging-effects.jpg", svg06()],
  ["07-handle-anatomy.jpg", svg07()],
  ["08-aftercare.jpg", svg08()],
];

for (const [filename, svgString] of FILES) {
  const outPath = path.join(OUT, filename);
  await sharp(Buffer.from(svgString)).jpeg({ quality: 88, mozjpeg: true }).toFile(outPath);
  console.log(`✓ ${filename}`);
}

console.log(`\nAll placeholders written to ${OUT}`);
