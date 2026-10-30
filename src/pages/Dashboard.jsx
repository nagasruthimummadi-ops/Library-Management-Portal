import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Users, BookCheck, Clock3, ArrowUpRight, Plus, ArrowRight } from "lucide-react";
import PageHeader from "../components/PageHeader";
import Status from "../components/Status";
import { getBooks, getMembers, getTransactions } from "../services/api";

export default function Dashboard() {
  const [data,setData] = useState({books:[],members:[],transactions:[]});
  const [error,setError] = useState("");
  useEffect(() => { Promise.all([getBooks(),getMembers(),getTransactions()]).then(([books,members,transactions])=>setData({books,members,transactions})).catch(()=>setError("Could not connect to JSON Server. Start it with npm run server.")); },[]);
  const active = data.transactions.filter(t=>t.status==="Issued");
  const stats = [
    {label:"Total books",value:data.books.length,icon:BookOpen,sub:"In your collection"},
    {label:"Available books",value:data.books.filter(b=>b.status==="Available").length,icon:BookCheck,sub:"Ready to issue"},
    {label:"Registered members",value:data.members.length,icon:Users,sub:"Active library members"},
    {label:"Books on loan",value:active.length,icon:Clock3,sub:"Currently issued"}
  ];
  const recent = [...data.transactions].sort((a,b)=>b.issueDate.localeCompare(a.issueDate)).slice(0,5);
  const bookName = id => data.books.find(b=>b.id===id)?.title || "Book unavailable";
  const memberName = id => data.members.find(m=>m.id===id)?.name || "Member unavailable";
  return <><PageHeader title="Good day, Librarian" description="Here’s what’s happening in your library today." action={<Link className="button button-primary" to="/issue"><Plus size={17}/> Issue a book</Link>}/>{error && <div className="alert">{error}</div>}
    <div className="stats-grid">{stats.map(({label,value,icon:Icon,sub},i)=><div className="stat-card" key={label}><div className={`stat-icon stat-icon-${i}`}><Icon size={20}/></div><div className="stat-label">{label}</div><div className="stat-value">{value}</div><div className="stat-sub">{sub}</div></div>)}</div>
    <div className="dashboard-grid"><section className="panel"><div className="panel-heading"><div><h2>Recent transactions</h2><p>Latest book circulation activity</p></div><Link to="/transactions" className="text-link">View all <ArrowUpRight size={15}/></Link></div>
      {recent.length ? <div className="table-wrap"><table><thead><tr><th>BOOK</th><th>MEMBER</th><th>ISSUE DATE</th><th>STATUS</th></tr></thead><tbody>{recent.map(t=><tr key={t.id}><td><strong>{bookName(t.bookId)}</strong></td><td>{memberName(t.memberId)}</td><td>{t.issueDate}</td><td><Status value={t.status}/></td></tr>)}</tbody></table></div>:<div className="empty-state"><HistoryIcon/><strong>No transactions yet</strong><span>Issue a book to see activity here.</span></div>}
    </section><section className="panel quick-panel"><div className="panel-heading"><div><h2>Quick actions</h2><p>Common library tasks</p></div></div><Link to="/books" className="quick-action"><span className="quick-icon"><BookOpen/></span><span><strong>Manage books</strong><small>Add, edit or remove books</small></span><ArrowRight size={17}/></Link><Link to="/members" className="quick-action"><span className="quick-icon purple"><Users/></span><span><strong>Manage members</strong><small>Maintain member records</small></span><ArrowRight size={17}/></Link><Link to="/returns" className="quick-action"><span className="quick-icon orange"><Clock3/></span><span><strong>Process returns</strong><small>Close active book issues</small></span><ArrowRight size={17}/></Link><div className="tip-box"><strong>Keep your library up to date</strong><p>Record every issue and return so book availability stays accurate.</p></div></section></div>
  </>;
}
function HistoryIcon(){return <Clock3 size={24}/>;}