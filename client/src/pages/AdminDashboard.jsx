import { useMemo, useState } from "react";

// -----------------------------
// Sample Data (mocked)
// -----------------------------
const initialOrders = [
  {
    id: "ORD-1027",
    client: "Aarav Mehta",
    email: "aarav@example.com",
    date: "2025-08-15",
    items: [
      { title: "Golden Horizon", size: "16x24", qty: 1, price: 120 },
      { title: "Silent Peaks", size: "12x18", qty: 2, price: 150 },
    ],
    status: "Pending",
    address: {
      line1: "221B Baker St",
      city: "Mumbai",
      zip: "400001",
      country: "IN",
    },
    paid: true,
  },
  {
    id: "ORD-1028",
    client: "Neha Sharma",
    email: "neha@example.com",
    date: "2025-08-18",
    items: [{ title: "Ocean Serenity", size: "20x30", qty: 1, price: 220 }],
    status: "Shipped",
    address: { line1: "MG Road 12", city: "Bengaluru", zip: "560001", country: "IN" },
    paid: true,
  },
  {
    id: "ORD-1029",
    client: "Rahul Verma",
    email: "rahul@example.com",
    date: "2025-08-21",
    items: [{ title: "Mystic Forest", size: "12x18", qty: 1, price: 130 }],
    status: "Delivered",
    address: { line1: "Park St 9", city: "Kolkata", zip: "700016", country: "IN" },
    paid: true,
  },
];

const initialPortfolio = [
  { id: "P-01", title: "Golden Horizon", category: "Landscape", date: "2025-02-01", src: "/images/print1.jpg" },
  { id: "P-02", title: "Silent Peaks", category: "Landscape", date: "2025-03-12", src: "/images/print2.jpg" },
  { id: "P-03", title: "Ocean Serenity", category: "Seascape", date: "2025-04-22", src: "/images/print3.jpg" },
  { id: "P-04", title: "Mystic Forest", category: "Forest", date: "2025-05-30", src: "/images/print4.jpg" },
];

const initialClients = [
  { id: "C-1001", name: "Aarav Mehta", email: "aarav@example.com", phone: "+91 90000 11111", orders: 3 },
  { id: "C-1002", name: "Neha Sharma", email: "neha@example.com", phone: "+91 90000 22222", orders: 1 },
  { id: "C-1003", name: "Rahul Verma", email: "rahul@example.com", phone: "+91 90000 33333", orders: 5 },
];

const initialActivity = [
  { id: 1, time: "10:24", text: "New order ORD-1029 from Rahul Verma" },
  { id: 2, time: "09:10", text: "Portfolio item 'Mystic Forest' updated" },
  { id: 3, time: "Yesterday", text: "Order ORD-1028 marked Shipped" },
];

// -----------------------------
// Helpers
// -----------------------------
function currency(n) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n * 83); // sample INR conv.
}

function orderTotal(items) {
  return items.reduce((s, it) => s + it.price * it.qty, 0);
}

// -----------------------------
// Root Component
// -----------------------------
export default function AdminDashboard() {
  const [tab, setTab] = useState("overview");
  const [orders, setOrders] = useState(initialOrders);
  const [portfolio, setPortfolio] = useState(initialPortfolio);
  const [clients, setClients] = useState(initialClients);
  const [activity, setActivity] = useState(initialActivity);

  // Derived stats
  const stats = useMemo(() => {
    const revenue = orders.reduce((s, o) => s + orderTotal(o.items), 0);
    const newOrders = orders.filter((o) => o.status === "Pending").length;
    const topSelling = (() => {
      const tally = {};
      orders.forEach((o) => o.items.forEach((it) => { tally[it.title] = (tally[it.title] || 0) + it.qty; }));
      const top = Object.entries(tally).sort((a, b) => b[1] - a[1])[0];
      return top ? `${top[0]} (${top[1]})` : "—";
    })();
    return { revenue, newOrders, visitors: 1743, topSelling };
  }, [orders]);

  // Activity logger
  const log = (text) => setActivity((a) => [{ id: Date.now(), time: new Date().toLocaleTimeString(), text }, ...a].slice(0, 30));

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <Header />
      <div className="flex">
        <Sidebar active={tab} onChange={setTab} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto w-full">
          {tab === "overview" && <Overview stats={stats} activity={activity} onQuick={(a) => handleQuickAction(a)} />}
          {tab === "orders" && <Orders orders={orders} setOrders={setOrders} onStatus={(id, st) => { setOrders((o) => o.map((x) => x.id === id ? { ...x, status: st } : x)); log(`Order ${id} marked ${st}`); }} />}
          {tab === "portfolio" && <Portfolio portfolio={portfolio} setPortfolio={setPortfolio} log={log} />}
          {tab === "clients" && <Clients clients={clients} setClients={setClients} />}
          {tab === "settings" && <Settings />}
        </main>
      </div>
    </div>
  );

  function handleQuickAction(action) {
    if (action === "add-item") setTab("portfolio");
    if (action === "write-story") alert("Open 'New Story' composer (to be implemented)");
    if (action === "send-invoice") setTab("clients");
  }
}

// -----------------------------
// Layout
// -----------------------------
function Header() {
  return (
    <header className="border-b bg-white sticky top-0 z-30">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="font-semibold tracking-tight">Studio Admin</div>
        <div className="flex items-center gap-3 text-sm">
          <input className="hidden md:block border rounded-lg px-3 py-2 w-64" placeholder="Search…" />
          <div className="w-8 h-8 rounded-full bg-neutral-200" />
        </div>
      </div>
    </header>
  );
}

function Sidebar({ active, onChange }) {
  const items = [
    { key: "overview", label: "Dashboard" },
    { key: "orders", label: "Orders" },
    { key: "portfolio", label: "Portfolio" },
    { key: "clients", label: "Clients" },
    { key: "settings", label: "Settings" },
  ];
  return (
    <aside className="hidden md:block w-60 shrink-0 border-r bg-white min-h-[calc(100vh-4rem)]">
      <nav className="p-4 space-y-1">
        {items.map((i) => (
          <button
            key={i.key}
            onClick={() => onChange(i.key)}
            className={`w-full text-left px-3 py-2 rounded-lg transition ${active === i.key ? "bg-neutral-900 text-white" : "hover:bg-neutral-100"}`}
          >
            {i.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

// -----------------------------
// Overview
// -----------------------------
function Overview({ stats, activity, onQuick }) {
  const cards = [
    { label: "New Orders", value: stats.newOrders },
    { label: "Visitors", value: stats.visitors },
    { label: "Revenue", value: currency(stats.revenue) },
    { label: "Top Seller", value: stats.topSelling },
  ];
  const quick = [
    { key: "add-item", label: "Add New Portfolio Item" },
    { key: "write-story", label: "Write New Story" },
    { key: "send-invoice", label: "Send Invoice" },
  ];
  return (
    <div className="space-y-6">
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl bg-white p-5 shadow-sm border">
            <div className="text-sm text-neutral-500">{c.label}</div>
            <div className="text-2xl font-semibold mt-1">{c.value}</div>
          </div>
        ))}
      </section>

      <section className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl bg-white border shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recent Activity</h3>
            <button className="text-sm text-neutral-500 hover:text-neutral-800">View all</button>
          </div>
          <ul className="space-y-3">
            {activity.map((a) => (
              <li key={a.id} className="flex items-start gap-3">
                <span className="mt-1 w-2 h-2 rounded-full bg-neutral-900" />
                <div>
                  <div className="text-sm">{a.text}</div>
                  <div className="text-xs text-neutral-500">{a.time}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-white border shadow-sm p-5">
          <h3 className="font-semibold mb-3">Quick Actions</h3>
          <div className="space-y-2">
            {quick.map((q) => (
              <button key={q.key} onClick={() => onQuick(q.key)} className="w-full text-left px-4 py-2 rounded-lg border hover:bg-neutral-50">
                {q.label}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// -----------------------------
// Orders
// -----------------------------
function Orders({ orders, setOrders, onStatus }) {
  const [q, setQ] = useState("");
  const [detail, setDetail] = useState(null);
  const filtered = useMemo(() => orders.filter((o) => o.id.toLowerCase().includes(q.toLowerCase()) || o.client.toLowerCase().includes(q.toLowerCase())), [orders, q]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search orders…" className="border rounded-lg px-3 py-2 w-full sm:w-72" />
        <span className="text-sm text-neutral-500">{filtered.length} results</span>
      </div>

      <div className="overflow-auto rounded-2xl border bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-50">
            <tr className="text-left">
              <Th>Order ID</Th>
              <Th>Client</Th>
              <Th>Date</Th>
              <Th>Items</Th>
              <Th>Status</Th>
              <Th className="text-right pr-4">Action</Th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <tr key={o.id} className="border-t hover:bg-neutral-50">
                <Td>{o.id}</Td>
                <Td>
                  <div className="font-medium">{o.client}</div>
                  <div className="text-neutral-500">{o.email}</div>
                </Td>
                <Td>{o.date}</Td>
                <Td>{o.items.map((it) => `${it.title} x${it.qty}`).join(", ")}</Td>
                <Td>
                  <select value={o.status} onChange={(e) => onStatus(o.id, e.target.value)} className="border rounded-lg px-2 py-1">
                    {["Pending", "Shipped", "Delivered", "Cancelled"].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </Td>
                <Td className="text-right pr-4">
                  <button className="px-3 py-1 rounded-lg border" onClick={() => setDetail(o)}>View</button>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {detail && (
        <Modal onClose={() => setDetail(null)} title={`Order ${detail.id}`}>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <div className="font-medium">{detail.client}</div>
              <div className="text-neutral-500">{detail.email}</div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Info label="Date" value={detail.date} />
              <Info label="Payment" value={detail.paid ? "Paid" : "Unpaid"} />
              <Info label="Status" value={detail.status} />
              <Info label="Total" value={currency(orderTotal(detail.items))} />
            </div>
            <div>
              <div className="font-medium mb-1">Items</div>
              <ul className="list-disc ml-5 space-y-1">
                {detail.items.map((it, idx) => (
                  <li key={idx}>{it.title} • {it.size} • x{it.qty}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-medium mb-1">Ship To</div>
              <div className="text-neutral-700">{detail.address.line1}, {detail.address.city} {detail.address.zip}, {detail.address.country}</div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// -----------------------------
// Portfolio Management
// -----------------------------
function Portfolio({ portfolio, setPortfolio, log }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [showNew, setShowNew] = useState(false);
  const categories = ["All", ...Array.from(new Set(portfolio.map((p) => p.category)))];
  const filtered = useMemo(() => portfolio.filter((p) => (cat === "All" || p.category === cat) && (p.title.toLowerCase().includes(q.toLowerCase()))), [q, cat, portfolio]);

  const remove = (id) => setPortfolio((arr) => arr.filter((p) => p.id !== id));

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" className="border rounded-lg px-3 py-2 w-full sm:w-72" />
        <select value={cat} onChange={(e) => setCat(e.target.value)} className="border rounded-lg px-3 py-2 w-full sm:w-56">
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
        <div className="flex-1" />
        <button onClick={() => setShowNew(true)} className="px-4 py-2 rounded-xl border bg-white hover:bg-neutral-50">Add New Item</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((p) => (
          <div key={p.id} className="rounded-2xl overflow-hidden border bg-white shadow-sm group">
            <div className="aspect-[4/3] bg-neutral-100 overflow-hidden">
              <img src={p.src} alt={p.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition" />
            </div>
            <div className="p-3 flex items-center justify-between">
              <div>
                <div className="font-medium text-sm">{p.title}</div>
                <div className="text-xs text-neutral-500">{p.category}</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => alert("Edit form TBD") } className="text-xs px-2 py-1 rounded-lg border">Edit</button>
                <button onClick={() => remove(p.id)} className="text-xs px-2 py-1 rounded-lg border text-red-600">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showNew && (
        <NewPortfolioItem onClose={() => setShowNew(false)} onSave={(item) => { setPortfolio((arr) => [{ id: `P-${Date.now()}`, ...item }, ...arr ]); log(`New portfolio item '${item.title}' added`); setShowNew(false); }} />
      )}
    </div>
  );
}

function NewPortfolioItem({ onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [src, setSrc] = useState("");
  const [zoom, setZoom] = useState(100); // pretend image adjustment

  return (
    <Modal title="Add New Portfolio Item" onClose={onClose}>
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onSave({ title, category, date: new Date().toISOString().slice(0,10), src }); }}>
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <input value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input value={src} onChange={(e) => setSrc(e.target.value)} required placeholder="/images/your-photo.jpg" className="w-full border rounded-lg px-3 py-2" />
        </div>
        {src && (
          <div>
            <div className="text-sm mb-1">Preview (basic scale)</div>
            <div className="aspect-[4/3] bg-neutral-100 overflow-hidden rounded-xl">
              <img src={src} alt="preview" style={{ transform: `scale(${zoom/100})` }} className="w-full h-full object-cover origin-center" />
            </div>
            <input type="range" min={80} max={120} value={zoom} onChange={(e) => setZoom(parseInt(e.target.value))} className="w-full mt-2" />
          </div>
        )}
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border">Cancel</button>
          <button type="submit" className="px-4 py-2 rounded-lg bg-neutral-900 text-white">Save</button>
        </div>
      </form>
    </Modal>
  );
}

// -----------------------------
// Clients
// -----------------------------
function Clients({ clients, setClients }) {
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState(null);
  const filtered = useMemo(() => clients.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()) || c.email.toLowerCase().includes(q.toLowerCase())), [clients, q]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search clients…" className="border rounded-lg px-3 py-2 w-full sm:w-72" />
        <div className="text-sm text-neutral-500">{filtered.length} found</div>
        <div className="flex-1" />
        <button onClick={() => alert("Invoicing flow TBD") } className="px-4 py-2 rounded-xl border bg-white hover:bg-neutral-50">Create Invoice</button>
      </div>

      <div className="overflow-auto rounded-2xl border bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-50">
            <tr className="text-left">
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Phone</Th>
              <Th>Orders</Th>
              <Th className="text-right pr-4">Action</Th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-t hover:bg-neutral-50">
                <Td>{c.name}</Td>
                <Td>{c.email}</Td>
                <Td>{c.phone}</Td>
                <Td>{c.orders}</Td>
                <Td className="text-right pr-4"><button className="px-3 py-1 rounded-lg border" onClick={() => setSelected(c)}>View</button></Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <Modal title={selected.name} onClose={() => setSelected(null)}>
          <div className="space-y-3 text-sm">
            <Info label="Email" value={selected.email} />
            <Info label="Phone" value={selected.phone} />
            <Info label="Orders" value={String(selected.orders)} />
            <div>
              <div className="font-medium mb-1">History</div>
              <ul className="list-disc ml-5 space-y-1">
                <li>2025-08-21 • Purchased "Mystic Forest"</li>
                <li>2025-06-05 • Inquiry: Pre-wedding shoot</li>
                <li>2025-04-17 • Purchased "Ocean Serenity"</li>
              </ul>
            </div>
            <div className="pt-2 flex gap-2">
              <button className="px-3 py-2 rounded-lg border">Add Note</button>
              <button className="px-3 py-2 rounded-lg bg-neutral-900 text-white">Send Invoice</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// -----------------------------
// Settings
// -----------------------------
function Settings() {
  const [tab, setTab] = useState("profile");
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {[
          { k: "profile", l: "Profile" },
          { k: "billing", l: "Billing & Subscriptions" },
          { k: "integrations", l: "Integrations" },
        ].map((t) => (
          <button key={t.k} onClick={() => setTab(t.k)} className={`px-4 py-2 rounded-xl border ${tab === t.k ? "bg-neutral-900 text-white" : "bg-white"}`}>{t.l}</button>
        ))}
      </div>

      {tab === "profile" && <ProfileSettings />}
      {tab === "billing" && <BillingSettings />}
      {tab === "integrations" && <IntegrationSettings />}
    </div>
  );
}

function ProfileSettings() {
  return (
    <form className="grid md:grid-cols-2 gap-4 bg-white border rounded-2xl p-5 shadow-sm">
      <Field label="Name" placeholder="Your name" />
      <Field label="Studio Name" placeholder="Studio" />
      <Field label="Bio" type="textarea" placeholder="Short bio" className="md:col-span-2" />
      <Field label="Instagram" placeholder="https://instagram.com/" />
      <Field label="Website" placeholder="https://" />
      <div className="md:col-span-2 flex justify-end gap-2">
        <button type="button" className="px-4 py-2 rounded-lg border">Cancel</button>
        <button className="px-4 py-2 rounded-lg bg-neutral-900 text-white">Save</button>
      </div>
    </form>
  );
}

function BillingSettings() {
  return (
    <div className="bg-white border rounded-2xl p-5 shadow-sm space-y-4">
      <div className="font-medium">Current Plan</div>
      <div className="rounded-xl border p-4 flex items-center justify-between">
        <div>
          <div className="font-semibold">Pro — ₹1,499 / month</div>
          <div className="text-sm text-neutral-500">Unlimited portfolio, 0% transaction fee</div>
        </div>
        <button className="px-4 py-2 rounded-lg border">Change</button>
      </div>
      <div className="pt-2">
        <div className="font-medium mb-2">Payment Method</div>
        <div className="rounded-xl border p-4 flex items-center justify-between">
          <div className="text-sm">VISA ending 4242</div>
          <button className="px-4 py-2 rounded-lg border">Update</button>
        </div>
      </div>
    </div>
  );
}

function IntegrationSettings() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {[{ name: "Google Analytics" }, { name: "Stripe" }, { name: "PayPal" }, { name: "QuickBooks" }].map((i) => (
        <div key={i.name} className="bg-white border rounded-2xl p-5 shadow-sm">
          <div className="font-semibold mb-1">{i.name}</div>
          <div className="text-sm text-neutral-500 mb-3">Connect to sync data.</div>
          <button className="px-4 py-2 rounded-lg border">Connect</button>
        </div>
      ))}
    </div>
  );
}

// -----------------------------
// Primitive UI helpers
// -----------------------------
function Th({ children, className = "" }) {
  return <th className={`px-4 py-3 text-xs font-semibold uppercase tracking-wide text-neutral-500 ${className}`}>{children}</th>;
}
function Td({ children, className = "" }) {
  return <td className={`px-4 py-3 align-top ${className}`}>{children}</td>;
}
function Info({ label, value }) {
  return (
    <div>
      <div className="text-xs uppercase text-neutral-500">{label}</div>
      <div>{value}</div>
    </div>
  );
}
function Field({ label, type = "text", className = "", ...props }) {
  return (
    <label className={`block ${className}`}>
      <div className="text-sm font-medium mb-1">{label}</div>
      {type === "textarea" ? (
        <textarea className="w-full border rounded-lg px-3 py-2" rows={4} {...props} />
      ) : (
        <input className="w-full border rounded-lg px-3 py-2" type={type} {...props} />
      )}
    </label>
  );
}

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="font-semibold">{title}</div>
          <button onClick={onClose} className="px-3 py-1 rounded-lg border">Close</button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
