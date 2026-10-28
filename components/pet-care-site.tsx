"use client";

import { FormEvent, useEffect, useState } from "react";

const services = [
  { icon: "🫧", title: "基础洗护", text: "梳毛开结、洁耳、洗澡、吹干、剪甲与脚底毛，完成日常清洁。", time: "约 60–90 分钟" },
  { icon: "✂️", title: "精致造型", text: "在基础洗护上，根据体型与毛量修剪适合日常打理的清爽造型。", time: "约 120–180 分钟" },
  { icon: "🌿", title: "舒缓 SPA", text: "温和清洁搭配毛发护理，适合干燥、打结或需要深度护理的毛孩子。", time: "约 90–120 分钟" },
];

const steps = [
  ["先了解它", "确认健康状态、过敏史、性格和你在意的细节。"],
  ["再开始洗护", "独立消毒工具，分区操作，使用宠物专用洗护产品。"],
  ["随时同步进度", "发现打结、皮肤异常等情况会先联系，不擅自加项。"],
  ["最后交接护理建议", "说明本次状态与回家后的梳毛、清洁注意事项。"],
];

const plans = [
  { tag: "短毛猫犬", title: "清爽基础洗护", price: "88", items: ["基础清洁与吹干", "洁耳与剪甲", "脚底毛修整"] },
  { tag: "本店推荐", title: "全套精致洗护", price: "158", items: ["基础洗护全项目", "局部修型", "毛发护理"], featured: true },
  { tag: "中长毛猫犬", title: "深层护理 SPA", price: "228", items: ["全套精致洗护", "深层毛发护理", "护理建议"] },
];

const faqs = [
  ["第一次来需要准备什么？", "建议带上免疫记录，并提前告知过敏、皮肤问题、慢性病与性格特点。熟悉的小零食也能帮助它放松。"],
  ["洗护时主人可以陪同吗？", "可通过透明区域查看。部分宠物看到主人会更紧张，我们会根据现场状态与你沟通最合适的方式。"],
  ["可以接待猫咪吗？", "可以。猫咪会安排相对安静的时段与独立工具，建议提前预约，尽量减少环境刺激。"],
  ["临时有事可以改期吗？", "可以，请尽量提前 4 小时联系我们，以便把时段留给其他需要的毛孩子。"],
];

function DogIllustration() {
  return (
    <svg className="pet-svg" viewBox="0 0 360 390" role="img" aria-label="戴着浴帽的小狗">
      <path d="M85 151C25 115 20 201 83 232" fill="#9a6445" stroke="#2f2b28" strokeWidth="8" />
      <path d="M275 151c60-36 65 50 2 81" fill="#9a6445" stroke="#2f2b28" strokeWidth="8" />
      <path d="M74 210c0-102 48-153 106-153s106 51 106 153v57c0 60-47 104-106 104S74 327 74 267z" fill="#c7895f" stroke="#2f2b28" strokeWidth="8" />
      <path d="M112 251c9-38 40-54 68-54s59 16 68 54c11 49-24 86-68 86s-79-37-68-86z" fill="#f8dfbc" />
      <circle cx="135" cy="203" r="10" fill="#2f2b28" /><circle cx="225" cy="203" r="10" fill="#2f2b28" />
      <ellipse cx="180" cy="245" rx="20" ry="16" fill="#2f2b28" />
      <path d="M180 258c-4 19-31 20-35 2m35-2c4 19 31 20 35 2" fill="none" stroke="#2f2b28" strokeWidth="6" strokeLinecap="round" />
      <g fill="#fff" stroke="#2f2b28" strokeWidth="6"><circle cx="100" cy="84" r="31" /><circle cx="139" cy="58" r="35" /><circle cx="181" cy="54" r="39" /><circle cx="224" cy="62" r="34" /><circle cx="260" cy="88" r="29" /><path d="M88 102c20-23 163-25 185 2l-8 45H96z" /></g>
      <circle cx="88" cy="39" r="13" fill="#fff" stroke="#2f2b28" strokeWidth="5" /><circle cx="57" cy="19" r="7" fill="#fff" stroke="#2f2b28" strokeWidth="4" />
    </svg>
  );
}

function BottleIllustration() {
  return (
    <svg viewBox="0 0 380 360" role="img" aria-label="宠物洗护用品插画">
      <path d="M46 296h289" stroke="#2f2b28" strokeWidth="8" strokeLinecap="round" />
      <rect x="105" y="82" width="153" height="215" rx="32" fill="#fffdf8" stroke="#2f2b28" strokeWidth="8" />
      <path d="M151 83V44h65v39M181 43V21h78" fill="none" stroke="#2f2b28" strokeWidth="8" strokeLinecap="round" /><path d="M259 21v36" stroke="#2f2b28" strokeWidth="8" />
      <circle cx="181" cy="185" r="54" fill="#b9dfcf" stroke="#2f2b28" strokeWidth="7" /><path d="M156 183c18-32 43-32 52 0 7 24-10 44-26 44s-39-20-26-44z" fill="#f08b4f" stroke="#2f2b28" strokeWidth="6" />
      <circle cx="90" cy="58" r="18" fill="#fff" stroke="#2f2b28" strokeWidth="6" /><circle cx="61" cy="28" r="10" fill="#fff" stroke="#2f2b28" strokeWidth="5" /><circle cx="299" cy="105" r="20" fill="#fff" stroke="#2f2b28" strokeWidth="6" />
    </svg>
  );
}

export default function PetCareSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState(false);
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    const now = new Date();
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
    setMinDate(local.toISOString().slice(0, 10));
  }, []);

  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setModalOpen(false);
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; document.removeEventListener("keydown", onKey); };
  }, [modalOpen]);

  const openBooking = () => { setMenuOpen(false); setModalOpen(true); };
  const submitBooking = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.currentTarget.reset();
    setModalOpen(false);
    setToast(true);
    window.setTimeout(() => setToast(false), 3200);
  };

  return (
    <>
      <header>
        <nav className="wrap">
          <a className="brand" href="#top"><span className="brand-mark">🐾</span>毛绒绒</a>
          <div className={`nav-links${menuOpen ? " open" : ""}`}>
            <a href="#services" onClick={() => setMenuOpen(false)}>洗护服务</a><a href="#care" onClick={() => setMenuOpen(false)}>安心流程</a><a href="#price" onClick={() => setMenuOpen(false)}>价格参考</a><a href="#visit" onClick={() => setMenuOpen(false)}>门店信息</a>
            <button className="nav-cta" onClick={openBooking}>立即预约</button>
          </div>
          <button className="menu" onClick={() => setMenuOpen((value) => !value)} aria-label="打开菜单" aria-expanded={menuOpen}>☰</button>
        </nav>
      </header>

      <main id="top">
        <section className="hero"><div className="wrap hero-grid"><div>
          <span className="eyebrow">为毛孩子认真洗个澡</span><h1>洗得干净，<br /><span className="soft">抱得更久。</span></h1>
          <p className="hero-copy">看得见的透明洗护，闻得到的淡淡清香。我们用温柔的手法、独立的工具和适合宠物肤质的产品，照顾每一只小脾气。</p>
          <div className="hero-actions"><button className="btn btn-primary" onClick={openBooking}>预约洗护 <span>→</span></button><a className="btn btn-ghost" href="#services">看看服务</a></div>
          <div className="trust"><span><i className="check">✓</i>一宠一消毒</span><span><i className="check">✓</i>过程可查看</span><span><i className="check">✓</i>拒绝强制推销</span></div>
        </div><div className="hero-art" aria-label="洗完澡的可爱小狗插画"><div className="blob" /><span className="spark a">✦</span><span className="spark b">✦</span><div className="pet-card"><DogIllustration /></div><div className="bubble one">温柔手法 🌿</div><div className="bubble two">今天也香香的！</div></div></div></section>

        <div className="ticker"><div className="ticker-track">洗澡 · 梳毛 · 修剪 · SPA <span>✦</span> 给每只小可爱专属的耐心 <span>✦</span> 洗澡 · 梳毛 · 修剪 · SPA <span>✦</span> 给每只小可爱专属的耐心 <span>✦</span></div></div>

        <section className="services" id="services"><div className="wrap"><div className="section-head"><div><span className="eyebrow">SERVICES</span><h2>从爪爪到耳朵，<br />每处都照顾到。</h2></div><p>根据宠物品种、毛发长度和皮肤状态安排服务，先沟通，再开始。</p></div><div className="service-grid">
          {services.map((service, index) => <article className="service-card" key={service.title}><div className="service-icon">{service.icon}</div><h3>{service.title}</h3><p>{service.text}</p><b>{service.time}</b><span className="num">0{index + 1}</span></article>)}
        </div></div></section>

        <section className="care" id="care"><div className="wrap care-grid"><div className="care-visual"><BottleIllustration /></div><div><span className="eyebrow">HOW WE CARE</span><h2 className="care-title">安心，不只是一句口号。</h2><div className="steps">
          {steps.map(([title, text], index) => <div className="step" key={title}><i>0{index + 1}</i><div><h3>{title}</h3><p>{text}</p></div></div>)}
        </div></div></div></section>

        <section id="price"><div className="wrap"><div className="section-head"><div><span className="eyebrow">PRICE GUIDE</span><h2>清楚消费，<br />轻松选择。</h2></div><p>以下为参考起步价，实际价格会根据体型、毛量、打结情况及配合程度在服务前确认。</p></div><div className="price-grid">
          {plans.map((plan) => <article className={`price-card${plan.featured ? " featured" : ""}`} key={plan.title}><span className="tag">{plan.tag}</span><h3>{plan.title}</h3><div className="price">¥{plan.price} <small>起</small></div><ul>{plan.items.map((item) => <li key={item}>✓ {item}</li>)}</ul><button className="btn" onClick={openBooking}>预约这个</button></article>)}
        </div><p className="price-note">* 严重打结、特殊体型或攻击性宠物可能产生额外服务费，我们会提前说明。</p></div></section>

        <section className="visit" id="visit"><div className="wrap"><div className="visit-box"><div className="visit-copy"><span className="eyebrow">COME SAY HI</span><h2>带它来，<br />认识一下吧。</h2><p>第一次来店，可以先让毛孩子熟悉环境。欢迎提前预约，减少等待。</p><div className="info"><div><span>📍</span><b>幸福路 88 号 · 毛绒绒宠物洗护</b></div><div><span>🕙</span><b>周二至周日 10:00–20:00</b></div><div><span>☎</span><b>400-888-2026</b></div></div><button className="btn btn-primary" onClick={openBooking}>预约到店</button></div><div className="map"><div className="map-grid" /><div className="pin"><span>🐾</span></div><div className="street">幸福路 · 88 号</div></div></div></div></section>

        <section><div className="wrap faq"><div className="section-head"><div><span className="eyebrow">FAQ</span><h2>你可能想问。</h2></div></div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>
      </main>

      <footer><div className="wrap"><div className="footer-top"><div className="footer-big">把干净与舒服，<br />一起带回家。</div><div className="footer-paw">🐾</div></div><div className="footer-bottom"><span>© 2026 毛绒绒宠物洗护</span><span>认真洗护每一只小可爱</span></div></div></footer>

      <div className={`modal${modalOpen ? " open" : ""}`} role="dialog" aria-modal="true" aria-labelledby="formTitle" onMouseDown={(event) => event.target === event.currentTarget && setModalOpen(false)}>
        <div className="modal-card"><button className="close" onClick={() => setModalOpen(false)} aria-label="关闭">×</button><h2 id="formTitle">预约洗护</h2><p>留下基本信息，我们会尽快与你确认时间与价格。</p><form onSubmit={submitBooking}><div className="form-grid">
          <div className="field"><label htmlFor="owner">你的称呼</label><input id="owner" name="owner" required placeholder="怎么称呼你" /></div><div className="field"><label htmlFor="phone">联系电话</label><input id="phone" name="phone" type="tel" required placeholder="手机号码" /></div>
          <div className="field"><label htmlFor="pet">宠物昵称</label><input id="pet" name="pet" required placeholder="毛孩子叫什么" /></div><div className="field"><label htmlFor="type">宠物类型</label><select id="type" name="type"><option>狗狗</option><option>猫咪</option><option>其他</option></select></div>
          <div className="field"><label htmlFor="service">服务项目</label><select id="service" name="service"><option>基础洗护</option><option>精致造型</option><option>舒缓 SPA</option></select></div><div className="field"><label htmlFor="date">期望日期</label><input id="date" name="date" type="date" min={minDate} required /></div>
          <div className="field full"><label htmlFor="note">补充说明</label><textarea id="note" name="note" rows={3} placeholder="品种、体重、性格或需要特别留意的地方" /></div>
        </div><button className="btn btn-primary submit" type="submit">提交预约</button></form></div>
      </div>
      <div className={`toast${toast ? " show" : ""}`} role="status">收到啦！我们会尽快联系你确认预约 🐾</div>
    </>
  );
}
