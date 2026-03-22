"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Address {
  id: string;
  label: string;
  value: string;
  isPrimary: boolean;
}

interface OrderItem {
  name: string;
  category: string;
  price: number;
  qty: number;
}

interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  status: "Delivered" | "Shipped" | "Processing" | "Cancelled";
  total: number;
}

// ─── Tailwind class constants ─────────────────────────────────────────────────
const cn = {
  sectionCard: "rounded-2xl border border-[#2a2a2a] p-7 mb-6 bg-brand-card",
  sectionTitle:
    "font-serif text-xl font-semibold tracking-wide text-brand-heading pb-3 mb-5 border-b border-[#2a2a2a]",
  fieldLabel:
    "block text-[0.7rem] font-bold tracking-[0.12em] uppercase mb-1.5 text-brand-heading",
  fieldInput:
    "w-full rounded-lg border border-[#2e2e2e] px-3.5 py-2.5 text-[0.9rem] bg-transparent text-white outline-none transition-colors focus:border-brand-accent placeholder:text-[#444]",
  fieldTextarea:
    "w-full rounded-lg border border-[#2e2e2e] px-3.5 py-2.5 text-[0.9rem] bg-transparent text-white outline-none resize-y transition-colors focus:border-brand-accent placeholder:text-[#444] font-sans",
  btnPrimary:
    "px-7 py-3 rounded-lg text-[0.78rem] font-bold tracking-[0.12em] uppercase text-white bg-brand-accent transition-opacity hover:opacity-90 cursor-pointer border-none",
  btnOutline:
    "px-4 py-2 rounded-lg text-[0.72rem] font-bold tracking-[0.1em] uppercase text-brand-accent border border-brand-accent bg-transparent transition-opacity hover:opacity-80 cursor-pointer",
  btnGhost:
    "px-3.5 py-2 rounded-lg text-[0.7rem] font-semibold tracking-[0.08em] uppercase bg-transparent text-[#777] border border-[#333] hover:border-[#555] transition-colors cursor-pointer",
};

// ─── Mock data ────────────────────────────────────────────────────────────────
const MOCK_ORDERS: Order[] = [
  {
    id: "GBX-10041",
    date: "12 Mar 2025",
    status: "Delivered",
    total: 1060.82,
    items: [
      { name: "Gold Chain Bracelet", category: "BRACELET", price: 899, qty: 1 },
    ],
  },
  {
    id: "GBX-10038",
    date: "28 Feb 2025",
    status: "Delivered",
    total: 2952.74,
    items: [
      { name: "Diamond Circle Ring", category: "RING", price: 999, qty: 1 },
      { name: "Gold Drop Earrings", category: "EARRING", price: 799, qty: 2 },
    ],
  },
  {
    id: "GBX-10031",
    date: "5 Jan 2025",
    status: "Cancelled",
    total: 65,
    items: [
      { name: "Rose Gold Bracelet", category: "BRACELET", price: 65, qty: 1 },
    ],
  },
];

const STATUS_STYLES: Record<Order["status"], string> = {
  Delivered: "bg-[#1a3326] text-[#4ade80]",
  Shipped: "bg-[#1a2b3d] text-[#60a5fa]",
  Processing: "bg-[#2d2a14] text-[#facc15]",
  Cancelled: "bg-[#2d1414] text-[#f87171]",
};

// ─── Shared primitives ────────────────────────────────────────────────────────
function InputField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className={cn.fieldLabel}>{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={cn.fieldInput}
      />
    </div>
  );
}

function StatusBadge({ status }: { status: Order["status"] }) {
  return (
    <span
      className={`text-[0.7rem] font-bold tracking-[0.08em] uppercase px-2.5 py-0.5 rounded-full ${STATUS_STYLES[status]}`}
    >
      {status}
    </span>
  );
}

// ─── Section components ───────────────────────────────────────────────────────
function PageHeader({ initials, name }: { initials: string; name: string }) {
  return (
    <div className="text-center border-b border-[#1e1e1e] px-10 pt-12 pb-8 sm:px-4 sm:pt-8 sm:pb-6 bg-gradient-to-b from-[#1a0e0f] to-brand-bg">
      <div className="w-[74px] h-[74px] rounded-full border-2 border-brand-accent bg-brand-glow text-brand-heading flex items-center justify-center mx-auto mb-3.5 text-[1.8rem] font-bold font-serif">
        {initials}
      </div>
      <h1 className="font-serif text-[clamp(1.6rem,4vw,2.2rem)] font-semibold tracking-[0.05em] text-brand-heading mb-1.5">
        {name || "My Profile"}
      </h1>
      <p className="text-[#777] text-[0.85rem]">
        Manage your profile, addresses & orders
      </p>
    </div>
  );
}

function PersonalDetailsSection({
  fullName,
  setFullName,
  phone,
  setPhone,
  altPhone,
  setAltPhone,
  saved,
  onSave,
}: {
  fullName: string;
  setFullName: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  altPhone: string;
  setAltPhone: (v: string) => void;
  saved: boolean;
  onSave: () => void;
}) {
  return (
    <div className={cn.sectionCard}>
      <h2 className={cn.sectionTitle}>Personal Details</h2>
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-1">
        <div className="col-span-2 sm:col-span-1">
          <InputField
            label="Full Name"
            value={fullName}
            onChange={setFullName}
            placeholder="Enter your full name"
          />
        </div>
        <InputField
          label="Phone Number"
          value={phone}
          onChange={setPhone}
          type="tel"
          placeholder="+91 00000 00000"
        />
        <InputField
          label="Alternate Number"
          value={altPhone}
          onChange={setAltPhone}
          type="tel"
          placeholder="+91 00000 00000"
        />
      </div>
      <div className="flex items-center gap-3.5 mt-6">
        <button className={cn.btnPrimary} onClick={onSave}>
          Save Details
        </button>
        {saved && (
          <span className="text-[#4ade80] text-[0.82rem]">
            ✓ Saved successfully
          </span>
        )}
      </div>
    </div>
  );
}

function AddressCard({
  addr,
  onSetPrimary,
  onDelete,
}: {
  addr: Address;
  onSetPrimary: () => void;
  onDelete: () => void;
}) {
  return (
    <div
      className={`rounded-xl border p-4 bg-brand-bg ${
        addr.isPrimary ? "border-brand-accent" : "border-[#2a2a2a]"
      }`}
    >
      <div className="flex items-center gap-2.5 flex-wrap mb-2">
        <span className="text-[0.72rem] font-bold tracking-[0.1em] uppercase text-brand-heading">
          {addr.label}
        </span>
        {addr.isPrimary && (
          <span className="text-[0.65rem] font-bold tracking-[0.1em] uppercase px-2.5 py-0.5 rounded-full border border-brand-accent bg-brand-glow text-brand-accent">
            Primary
          </span>
        )}
      </div>
      <p className="text-[#ccc] text-[0.88rem] leading-relaxed mb-3">
        {addr.value}
      </p>
      <div className="flex gap-2 flex-wrap">
        {!addr.isPrimary && (
          <button className={cn.btnOutline} onClick={onSetPrimary}>
            Set as Primary
          </button>
        )}
        <button className={cn.btnGhost} onClick={onDelete}>
          Remove
        </button>
      </div>
    </div>
  );
}

function SavedAddressesSection({
  addresses,
  showAddrForm,
  setShowAddrForm,
  newAddrLabel,
  setNewAddrLabel,
  newAddr,
  setNewAddr,
  addAddress,
  setPrimary,
  deleteAddress,
}: {
  addresses: Address[];
  showAddrForm: boolean;
  setShowAddrForm: (v: boolean) => void;
  newAddrLabel: string;
  setNewAddrLabel: (v: string) => void;
  newAddr: string;
  setNewAddr: (v: string) => void;
  addAddress: () => void;
  setPrimary: (id: string) => void;
  deleteAddress: (id: string) => void;
}) {
  return (
    <div className={cn.sectionCard}>
      <div className="flex items-center justify-between flex-wrap gap-3 pb-3 mb-5 border-b border-[#2a2a2a]">
        <h2 className="font-serif text-xl font-semibold tracking-wide text-brand-heading">
          Saved Addresses
        </h2>
        <button
          className={cn.btnOutline}
          onClick={() => setShowAddrForm(!showAddrForm)}
        >
          {showAddrForm ? "✕ Cancel" : "+ Add Address"}
        </button>
      </div>

      {showAddrForm && (
        <div className="rounded-xl border border-[#2e2e2e] p-5 mb-5 flex flex-col gap-3.5 bg-brand-bg">
          <InputField
            label="Label (e.g. Home, Office)"
            value={newAddrLabel}
            onChange={setNewAddrLabel}
            placeholder="Home"
          />
          <div className="flex flex-col gap-1.5">
            <label className={cn.fieldLabel}>Full Address</label>
            <textarea
              value={newAddr}
              rows={3}
              placeholder="House/Flat No., Street, City, State, PIN"
              onChange={(e) => setNewAddr(e.target.value)}
              className={cn.fieldTextarea}
            />
          </div>
          <button className={`${cn.btnPrimary} w-fit`} onClick={addAddress}>
            Save Address
          </button>
        </div>
      )}

      {addresses.length === 0 && (
        <p className="text-[#555] text-[0.9rem]">No addresses saved yet.</p>
      )}
      <div className="flex flex-col gap-3.5">
        {addresses.map((addr) => (
          <AddressCard
            key={addr.id}
            addr={addr}
            onSetPrimary={() => setPrimary(addr.id)}
            onDelete={() => deleteAddress(addr.id)}
          />
        ))}
      </div>
    </div>
  );
}

function OrderRow({ order }: { order: Order }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-[#2a2a2a] overflow-hidden bg-brand-bg">
      <div
        className="flex items-center justify-between flex-wrap gap-2.5 p-4 cursor-pointer hover:bg-white/[0.02] transition-colors select-none"
        onClick={() => setOpen((p) => !p)}
      >
        <div className="flex flex-col gap-1">
          <span className="font-bold text-[0.85rem] tracking-[0.04em] text-brand-heading">
            {order.id}
          </span>
          <span className="text-[#777] text-[0.78rem]">
            {order.date} · {order.items.length}{" "}
            {order.items.length === 1 ? "item" : "items"}
          </span>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <StatusBadge status={order.status} />
          <span className="font-bold text-[0.95rem] text-brand-heading">
            ₹{order.total.toFixed(2)}
          </span>
          <span
            className="text-[#555] text-[0.75rem] inline-block transition-transform duration-200"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            ▾
          </span>
        </div>
      </div>

      {open && (
        <div className="border-t border-[#1e1e1e] px-4 py-3 flex flex-col gap-2.5">
          {order.items.map((item, idx) => (
            <div
              key={idx}
              className={`flex justify-between items-center flex-wrap gap-2 py-2.5 ${
                idx < order.items.length - 1 ? "border-b border-[#1e1e1e]" : ""
              }`}
            >
              <div>
                <div className="text-[0.65rem] tracking-[0.1em] uppercase text-[#777] mb-0.5">
                  {item.category}
                </div>
                <div className="text-[0.92rem] text-white">{item.name}</div>
                <div className="text-[0.78rem] text-[#777]">
                  Qty: {item.qty}
                </div>
              </div>
              <span className="font-bold text-[0.95rem] text-brand-heading">
                ₹{(item.price * item.qty).toFixed(2)}
              </span>
            </div>
          ))}
          <div className="flex justify-between pt-2.5 border-t border-[#2a2a2a]">
            <span className="text-[#777] text-[0.82rem]">
              Total (incl. GST & shipping)
            </span>
            <span className="font-bold text-[0.95rem] text-brand-heading">
              ₹{order.total.toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function MyOrdersSection({ orders }: { orders: Order[] }) {
  return (
    <div className={cn.sectionCard}>
      <h2 className={cn.sectionTitle}>My Orders</h2>
      {orders.length === 0 ? (
        <p className="text-[#555]">No orders placed yet.</p>
      ) : (
        <div className="flex flex-col gap-3.5">
          {orders.map((o) => (
            <OrderRow key={o.id} order={o} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ProfilePage() {
  const [fullName, setFullName] = useState("Priya Sharma");
  const [phone, setPhone] = useState("98765 43210");
  const [altPhone, setAltPhone] = useState("");
  const [saved, setSaved] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "addr-1",
      label: "Home",
      isPrimary: true,
      value:
        "12, Rose Garden Apartments, MG Road, Bengaluru - 560001, Karnataka",
    },
  ]);
  const [newAddr, setNewAddr] = useState("");
  const [newAddrLabel, setNewAddrLabel] = useState("");
  const [showAddrForm, setShowAddrForm] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const addAddress = () => {
    if (!newAddr.trim()) return;
    setAddresses((prev) => [
      ...prev,
      {
        id: `addr-${Date.now()}`,
        label: newAddrLabel.trim() || "Address",
        value: newAddr.trim(),
        isPrimary: prev.length === 0,
      },
    ]);
    setNewAddr("");
    setNewAddrLabel("");
    setShowAddrForm(false);
  };

  const setPrimary = (id: string) =>
    setAddresses((prev) => prev.map((a) => ({ ...a, isPrimary: a.id === id })));
  const deleteAddress = (id: string) =>
    setAddresses((prev) => {
      const next = prev.filter((a) => a.id !== id);
      if (next.length && !next.some((a) => a.isPrimary))
        next[0].isPrimary = true;
      return next;
    });

  const avatarInitials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-brand-bg text-white">
      <PageHeader initials={avatarInitials} name={fullName} />
      <div className="max-w-[900px] mx-auto px-6 py-8 pb-16 sm:px-4">
        <PersonalDetailsSection
          fullName={fullName}
          setFullName={setFullName}
          phone={phone}
          setPhone={setPhone}
          altPhone={altPhone}
          setAltPhone={setAltPhone}
          saved={saved}
          onSave={handleSave}
        />
        <SavedAddressesSection
          addresses={addresses}
          showAddrForm={showAddrForm}
          setShowAddrForm={setShowAddrForm}
          newAddrLabel={newAddrLabel}
          setNewAddrLabel={setNewAddrLabel}
          newAddr={newAddr}
          setNewAddr={setNewAddr}
          addAddress={addAddress}
          setPrimary={setPrimary}
          deleteAddress={deleteAddress}
        />
        <MyOrdersSection orders={MOCK_ORDERS} />
      </div>
    </div>
  );
}
