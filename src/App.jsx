import { useEffect, useState } from "react";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import { BookOpen, LayoutDashboard, Users, ArrowLeftRight, RotateCcw, History, Library, Menu, X } from "lucide-react";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Members from "./pages/Members";
import IssueBook from "./pages/IssueBook";
import ReturnBook from "./pages/ReturnBook";
import Transactions from "./pages/Transactions";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/books", label: "Books", icon: BookOpen },
  { to: "/members", label: "Members", icon: Users },
  { to: "/issue", label: "Issue book", icon: ArrowLeftRight },
  { to: "/returns", label: "Return book", icon: RotateCcw },
  { to: "/transactions", label: "Transactions", icon: History }
];

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setMobileOpen(false), [location.pathname]);
  return <div className="app-shell">
    <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
      <div className="brand"><span className="brand-icon"><Library size={22}/></span><span>PageTurn<small>LIBRARY PORTAL</small></span></div>
      <div className="side-label">WORKSPACE</div>
      <nav>{nav.map(({to,label,icon:Icon,end}) => <NavLink key={to} to={to} end={end} className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}><Icon size={18}/><span>{label}</span></NavLink>)}</nav>
      <div className="sidebar-bottom"><div className="help-card"><div className="help-dot"/> <div><strong>Library operations</strong><small>Manage your collection with ease.</small></div></div><small className="version">PageTurn · React capstone</small></div>
    </aside>
    {mobileOpen && <button className="mobile-scrim" onClick={() => setMobileOpen(false)} aria-label="Close menu"/>}
    <main className="main-area">
      <header className="topbar"><button className="mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">{mobileOpen ? <X/> : <Menu/>}</button><div className="breadcrumb">Workspace <span>/</span> <b>{nav.find(n => n.to === location.pathname)?.label || "Dashboard"}</b></div><div className="profile"><div className="avatar">LB</div><div><strong>Library Admin</strong><small>Librarian</small></div></div></header>
      <div className="page-wrap"><Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/books" element={<Books/>}/>
        <Route path="/members" element={<Members/>}/>
        <Route path="/issue" element={<IssueBook/>}/>
        <Route path="/returns" element={<ReturnBook/>}/>
        <Route path="/transactions" element={<Transactions/>}/>
      </Routes></div>
      <footer>© 2026 PageTurn Library Portal <span>Built with React + JSON Server</span></footer>
    </main>
  </div>;
}