import { redirect } from "next/navigation";

export default function Home() {
  redirect("/dashboard");
}

<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>LeadFlowai — Dashboard MVP</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f1f5f9;color:#0f172a;overflow:hidden;}
:root{--accent:#4361ee;--accent-light:#eef0fd;--bg-primary:#fff;--bg-secondary:#f8fafc;--text-primary:#0f172a;--text-secondary:#64748b;--border:#e2e8f0;--border-hover:#cbd5e1;}
.nav-item{display:flex;align-items:center;gap:10px;padding:8px 14px;border-radius:8px;cursor:pointer;font-size:13px;font-weight:500;color:rgba(255,255,255,0.55);transition:all .15s;white-space:nowrap;border:none;background:none;width:100%}
.nav-item:hover{background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.85)}
.nav-item.active{background:rgba(67,97,238,0.2);color:#fff}
.nav-item .icon{width:16px;height:16px;flex-shrink:0;opacity:0.7}
.nav-item.active .icon{opacity:1}
.badge{display:inline-flex;align-items:center;justify-content:center;padding:1px 7px;border-radius:99px;font-size:11px;font-weight:500}
.badge-new{background:#eef0fd;color:#4361ee}.badge-contacted{background:#e0f2fe;color:#0369a1}.badge-replied{background:#dcfce7;color:#166534}.badge-qualified{background:#fef3c7;color:#92400e}.badge-lost{background:#fee2e2;color:#991b1b}.badge-client{background:#d1fae5;color:#065f46}
.badge-open{background:#fef3c7;color:#92400e}.badge-progress{background:#dbeafe;color:#1e40af}.badge-resolved{background:#dcfce7;color:#166534}
.badge-high{background:#fee2e2;color:#991b1b}.badge-med{background:#fef3c7;color:#92400e}.badge-low{background:#f0fdf4;color:#166534}
.badge-linkedin{background:#e0f2fe;color:#0369a1}.badge-website{background:#f0fdf4;color:#166534}.badge-manual{background:#f5f3ff;color:#5b21b6}
.kpi-card{background:var(--bg-primary);border:0.5px solid var(--border);border-radius:12px;padding:16px 20px}
.kpi-label{font-size:12px;color:var(--text-secondary);font-weight:500;text-transform:uppercase;letter-spacing:0.03em;margin-bottom:8px}
.kpi-val{font-size:26px;font-weight:600;color:var(--text-primary);line-height:1}
.kpi-delta{font-size:12px;margin-top:6px;color:#16a34a}.kpi-delta.neg{color:#dc2626}
.agent-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0}.dot-active{background:#22c55e}.dot-idle{background:#94a3b8}.dot-busy{background:#f59e0b}
.log-dot-success{background:#22c55e}.log-dot-error{background:#ef4444}.log-dot-warn{background:#f59e0b}.log-dot-info{background:#4361ee}
.view{display:none}.view.active{display:block}
.table-wrap{overflow-x:auto}
table{width:100%;border-collapse:collapse;font-size:13px}
th{text-align:left;padding:10px 12px;font-size:11px;font-weight:500;color:var(--text-secondary);text-transform:uppercase;letter-spacing:0.04em;border-bottom:0.5px solid var(--border)}
td{padding:11px 12px;border-bottom:0.5px solid var(--border);color:var(--text-primary);vertical-align:middle}
tr:last-child td{border-bottom:none}
tr:hover td{background:rgba(0,0,0,0.012)}
.score-bar{width:48px;height:5px;background:#e2e8f0;border-radius:3px;overflow:hidden}.score-fill{height:100%;background:#4361ee;border-radius:3px}
.inbox-item{display:flex;align-items:flex-start;gap:10px;padding:12px 14px;cursor:pointer;border-bottom:0.5px solid var(--border);transition:background .1s}
.inbox-item:hover{background:rgba(0,0,0,0.018)}.inbox-item.active-conv{background:var(--accent-light);border-left:2px solid var(--accent)}
.avatar{width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600;flex-shrink:0}
.btn-primary{background:var(--accent);color:white;border:none;border-radius:8px;padding:7px 14px;font-size:13px;font-weight:500;cursor:pointer;transition:opacity .15s,transform .1s;position:relative}
.btn-primary:hover{opacity:0.9}.btn-primary:active{transform:scale(0.97)}.btn-primary.loading{opacity:0.7;pointer-events:none}.btn-primary.success-state{background:#16a34a}
.btn-ghost{background:none;border:0.5px solid var(--border-hover);border-radius:8px;padding:7px 14px;font-size:13px;font-weight:500;cursor:pointer;color:var(--text-primary);transition:background .15s,transform .1s}
.btn-ghost:hover{background:var(--bg-secondary)}.btn-ghost:active{transform:scale(0.97)}
.btn-danger{background:#fee2e2;color:#991b1b;border:none;border-radius:8px;padding:7px 14px;font-size:13px;font-weight:500;cursor:pointer;transition:opacity .15s}
.btn-danger:hover{opacity:0.85}
.input{border:0.5px solid var(--border);border-radius:8px;padding:7px 12px;font-size:13px;background:var(--bg-primary);color:var(--text-primary);outline:none;width:100%;transition:border-color .15s}
.input:focus{border-color:#4361ee;box-shadow:0 0 0 3px rgba(67,97,238,0.1)}
.kanban-col{background:var(--bg-secondary);border-radius:10px;padding:12px;min-width:200px;flex:1}
.kanban-title{font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-secondary);margin-bottom:10px;display:flex;align-items:center;justify-content:space-between}
.kanban-card{background:var(--bg-primary);border:0.5px solid var(--border);border-radius:8px;padding:12px;margin-bottom:8px;cursor:pointer;transition:border-color .15s,box-shadow .15s}
.kanban-card:hover{border-color:#4361ee;box-shadow:0 2px 8px rgba(67,97,238,0.1)}
.log-row{display:flex;align-items:flex-start;gap:10px;padding:10px 0;border-bottom:0.5px solid var(--border)}.log-row:last-child{border-bottom:none}
.agent-chip{display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:99px;font-size:11px;font-weight:500;flex-shrink:0}
.chip-ceo{background:#f5f3ff;color:#5b21b6}.chip-prosp{background:#e0f2fe;color:#0369a1}.chip-resp{background:#dcfce7;color:#166534}.chip-clos{background:#fef3c7;color:#92400e}.chip-supp{background:#fee2e2;color:#991b1b}
.section-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
.section-title{font-size:16px;font-weight:600;color:var(--text-primary)}
.billing-card{background:linear-gradient(135deg,#1e293b 0%,#0d1421 100%);border-radius:12px;padding:24px;color:white}
.search-wrap{position:relative;width:240px}.search-wrap input{padding-left:32px}
.search-icon{position:absolute;left:10px;top:50%;transform:translateY(-50%);color:var(--text-secondary);font-size:14px;pointer-events:none}
.msg-bubble{padding:10px 14px;border-radius:10px;font-size:13px;line-height:1.5;max-width:75%;margin-bottom:2px}
.msg-in{background:var(--bg-secondary);color:var(--text-primary);align-self:flex-start;border-bottom-left-radius:3px}
.msg-out{background:#4361ee;color:white;align-self:flex-end;border-bottom-right-radius:3px}
.msg-time{font-size:10px;color:var(--text-secondary);margin-bottom:10px}
.msg-time-out{font-size:10px;color:rgba(255,255,255,0.55);background:#4361ee;padding:1px 7px;border-radius:4px;margin-bottom:10px;align-self:flex-end}
.toggle{position:relative;width:36px;height:20px;cursor:pointer;flex-shrink:0}
.toggle input{opacity:0;width:0;height:0}
.slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background:#cbd5e1;border-radius:20px;transition:.3s}
.slider:before{content:'';position:absolute;height:14px;width:14px;left:3px;bottom:3px;background:white;border-radius:50%;transition:.3s}
.toggle input:checked+.slider{background:#4361ee}
.toggle input:checked+.slider:before{transform:translateX(16px)}
/* priority bar tickets */
.pbar{width:3px;height:34px;border-radius:2px;flex-shrink:0;margin-right:4px}
.pbar-high{background:#dc2626}.pbar-med{background:#d97706}.pbar-low{background:#16a34a}
/* sla */
.sla-urgent{color:#dc2626;font-weight:600;font-size:11px}
.sla-med{color:#d97706;font-weight:600;font-size:11px}
.sla-ok{color:#16a34a;font-weight:600;font-size:11px}
/* pipeline funnel */
.funnel-step{display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:0.5px solid var(--border)}
.funnel-step:last-child{border-bottom:none}
.funnel-bar-wrap{flex:1;height:6px;background:#e2e8f0;border-radius:3px;overflow:hidden}
.funnel-bar{height:100%;border-radius:3px;transition:width .4s}
/* marketplace agent cards */
.mkt-card{background:var(--bg-primary);border:0.5px solid var(--border);border-radius:12px;padding:20px;transition:border-color .15s,box-shadow .15s;cursor:default}
.mkt-card:hover{border-color:#4361ee;box-shadow:0 2px 12px rgba(67,97,238,0.08)}
.mkt-agent-icon{width:42px;height:42px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;margin-bottom:12px;flex-shrink:0}
/* arch diagram */
.arch-node{padding:9px 16px;border-radius:8px;font-size:12px;font-weight:600;text-align:center;white-space:nowrap}
.arch-ceo{background:rgba(124,58,237,0.2);border:1px solid rgba(124,58,237,0.35);color:#c4b5fd}
.arch-agent{background:rgba(67,97,238,0.18);border:1px solid rgba(67,97,238,0.35);color:#93c5fd}
.arch-platform{background:rgba(16,185,129,0.15);border:1px solid rgba(16,185,129,0.3);color:#6ee7b7}
.arch-firebase{background:rgba(251,146,60,0.15);border:1px solid rgba(251,146,60,0.3);color:#fcd34d}
.arch-stripe{background:rgba(99,102,241,0.18);border:1px solid rgba(99,102,241,0.35);color:#a5b4fc}
/* checklist */
.ck-item{display:flex;align-items:flex-start;gap:12px;padding:13px 16px;background:var(--bg-primary);border:0.5px solid var(--border);border-radius:10px;cursor:pointer;transition:border-color .15s;margin-bottom:8px}
.ck-item:hover{border-color:#4361ee}
.ck-item.done{opacity:0.5}
.ck-item.done .ck-text{text-decoration:line-through}
.ck-box{width:20px;height:20px;border-radius:5px;border:1.5px solid var(--border);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;transition:all .15s;background:var(--bg-secondary)}
.ck-item.done .ck-box{background:#4361ee;border-color:#4361ee}
.ck-text{font-size:13px;font-weight:500}
.ck-sub{font-size:12px;color:var(--text-secondary);margin-top:2px}
.ctag{display:inline-block;padding:1px 7px;border-radius:4px;font-size:10px;font-weight:600;margin-left:7px}
.ctag-blue{background:#dbeafe;color:#1e40af}.ctag-green{background:#dcfce7;color:#166534}.ctag-amber{background:#fef3c7;color:#92400e}.ctag-purple{background:#f5f3ff;color:#5b21b6}.ctag-red{background:#fee2e2;color:#991b1b}
/* budget */
.budget-item{display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:0.5px solid var(--border);font-size:13px}
.budget-item:last-child{border-bottom:none}
/* code block */
.code-block{background:#0f172a;border-radius:10px;overflow:hidden;margin-bottom:16px}
.code-header{display:flex;align-items:center;justify-content:space-between;padding:10px 16px;background:#1e293b;border-bottom:0.5px solid rgba(255,255,255,0.06)}
.code-lang{font-size:11px;font-weight:600;color:#475569;text-transform:uppercase;letter-spacing:0.05em}
.copy-btn{font-size:11px;background:none;border:0.5px solid rgba(255,255,255,0.12);color:rgba(255,255,255,0.4);border-radius:5px;padding:3px 9px;cursor:pointer;transition:all .15s}
.copy-btn:hover{color:rgba(255,255,255,0.75);background:rgba(255,255,255,0.07)}
pre{padding:18px 20px;overflow-x:auto;font-size:12px;line-height:1.75;margin:0;color:#e2e8f0}
code{font-family:'SF Mono','Fira Code',monospace}
.kw{color:#c084fc}.fn{color:#60a5fa}.st{color:#86efac}.cm{color:#475569}.nb{color:#fb923c}
/* TOAST */
#toast-container{position:fixed;bottom:24px;right:24px;z-index:9999;display:flex;flex-direction:column;gap:8px;pointer-events:none}
.toast{background:#0f172a;color:white;padding:11px 15px;border-radius:10px;font-size:13px;font-weight:500;opacity:0;transform:translateY(8px) scale(0.97);transition:opacity .22s,transform .22s;pointer-events:none;max-width:300px;display:flex;align-items:center;gap:9px;box-shadow:0 4px 20px rgba(0,0,0,0.25)}
.toast.show{opacity:1;transform:translateY(0) scale(1)}
.toast-icon{width:18px;height:18px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:9px;font-weight:700}
.toast-success .toast-icon{background:#22c55e;color:white}.toast-info .toast-icon{background:#4361ee;color:white}.toast-warn .toast-icon{background:#f59e0b;color:white}
/* MODAL */
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.4);z-index:1000;display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity .18s}
.modal-overlay.open{opacity:1;pointer-events:all}
.modal{background:var(--bg-primary);border-radius:14px;padding:24px;width:480px;max-width:92vw;max-height:85vh;overflow-y:auto;transform:translateY(12px);transition:transform .2s;box-shadow:0 8px 40px rgba(0,0,0,0.18)}
.modal-overlay.open .modal{transform:translateY(0)}
.modal-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px}
.modal-title{font-size:16px;font-weight:600}.modal-close{background:none;border:none;cursor:pointer;color:var(--text-secondary);font-size:20px;line-height:1;padding:2px 6px;border-radius:4px}
.modal-close:hover{background:var(--bg-secondary)}
.form-row{margin-bottom:14px}
.form-label{font-size:12px;color:var(--text-secondary);font-weight:500;margin-bottom:6px;display:block}
.form-select{border:0.5px solid var(--border);border-radius:8px;padding:7px 12px;font-size:13px;background:var(--bg-primary);color:var(--text-primary);outline:none;width:100%}
.form-select:focus{border-color:#4361ee}
.modal-footer{display:flex;justify-content:flex-end;gap:10px;margin-top:20px;padding-top:16px;border-top:0.5px solid var(--border)}
.spinner{display:inline-block;width:12px;height:12px;border:2px solid rgba(255,255,255,0.3);border-top-color:white;border-radius:50%;animation:spin .6s linear infinite;vertical-align:middle;margin-right:5px}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
@keyframes fadeIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}
.fade-in{animation:fadeIn .2s ease}
</style>
</head>
<body>
<div id="toast-container"></div>

<!-- MODALS -->
<div class="modal-overlay" id="modal-add-lead" onclick="closeOnOverlay(event,'modal-add-lead')">
  <div class="modal">
    <div class="modal-header"><span class="modal-title">Ajouter un lead</span><button class="modal-close" onclick="closeModal('modal-add-lead')">&#215;</button></div>
    <div class="form-row"><label class="form-label">Nom complet</label><input class="input" id="nl-name" placeholder="Marie Dupont"/></div>
    <div class="form-row"><label class="form-label">Entreprise</label><input class="input" id="nl-company" placeholder="Acme SAS"/></div>
    <div class="form-row"><label class="form-label">Poste</label><input class="input" id="nl-role" placeholder="CMO"/></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
      <div class="form-row"><label class="form-label">Source</label><select class="form-select" id="nl-source"><option value="linkedin">LinkedIn</option><option value="website">Site web</option><option value="manual">Manuel</option></select></div>
      <div class="form-row"><label class="form-label">Statut</label><select class="form-select" id="nl-status"><option value="new">Nouveau</option><option value="contacted">Contacte</option></select></div>
    </div>
    <div class="modal-footer"><button class="btn-ghost" onclick="closeModal('modal-add-lead')">Annuler</button><button class="btn-primary" onclick="submitAddLead(this)">Ajouter le lead</button></div>
  </div>
</div>
<div class="modal-overlay" id="modal-lead-detail" onclick="closeOnOverlay(event,'modal-lead-detail')">
  <div class="modal">
    <div class="modal-header"><span class="modal-title" id="detail-title">Fiche lead</span><button class="modal-close" onclick="closeModal('modal-lead-detail')">&#215;</button></div>
    <div id="detail-body"></div>
    <div class="modal-footer"><button class="btn-ghost" onclick="closeModal('modal-lead-detail')">Fermer</button><button class="btn-primary" onclick="contactFromDetail(this)">Contacter maintenant</button></div>
  </div>
</div>
<div class="modal-overlay" id="modal-ticket" onclick="closeOnOverlay(event,'modal-ticket')">
  <div class="modal">
    <div class="modal-header"><span class="modal-title" id="tk-modal-title">Ticket</span><button class="modal-close" onclick="closeModal('modal-ticket')">&#215;</button></div>
    <div id="tk-modal-body"></div>
    <div class="form-row" style="margin-top:16px;"><label class="form-label">Reponse au client</label><textarea class="input" id="tk-reply" rows="3" placeholder="Rediger une reponse..."></textarea></div>
    <div class="modal-footer"><button class="btn-danger" onclick="resolveTicket(this)">Marquer resolu</button><button class="btn-primary" onclick="sendTicketReply(this)">Envoyer la reponse</button></div>
  </div>
</div>
<div class="modal-overlay" id="modal-opp" onclick="closeOnOverlay(event,'modal-opp')">
  <div class="modal">
    <div class="modal-header"><span class="modal-title">Nouvelle opportunite</span><button class="modal-close" onclick="closeModal('modal-opp')">&#215;</button></div>
    <div class="form-row"><label class="form-label">Nom du prospect</label><input class="input" id="op-name" placeholder="Jean Martin"/></div>
    <div class="form-row"><label class="form-label">Entreprise</label><input class="input" id="op-company" placeholder="Startup SAS"/></div>
    <div class="form-row"><label class="form-label">Etape initiale</label><select class="form-select" id="op-stage"><option value="0">Warm</option><option value="1">Calendly envoye</option><option value="2">RDV confirme</option></select></div>
    <div class="modal-footer"><button class="btn-ghost" onclick="closeModal('modal-opp')">Annuler</button><button class="btn-primary" onclick="submitAddOpp(this)">Creer l'opportunite</button></div>
  </div>
</div>
<div class="modal-overlay" id="modal-calendly" onclick="closeOnOverlay(event,'modal-calendly')">
  <div class="modal" style="width:400px;">
    <div class="modal-header"><span class="modal-title">Envoyer lien Calendly</span><button class="modal-close" onclick="closeModal('modal-calendly')">&#215;</button></div>
    <p style="font-size:13px;color:var(--text-secondary);margin-bottom:14px;">L'agent Closing enverra ce lien automatiquement au prospect selectionne.</p>
    <div style="background:var(--bg-secondary);border-radius:8px;padding:12px;font-size:13px;color:#4361ee;">https://calendly.com/acme/demo-30min</div>
    <div class="modal-footer"><button class="btn-ghost" onclick="closeModal('modal-calendly')">Annuler</button><button class="btn-primary" onclick="confirmCalendly(this)">Confirmer l'envoi</button></div>
  </div>
</div>
<div class="modal-overlay" id="modal-script" onclick="closeOnOverlay(event,'modal-script')">
  <div class="modal" style="width:700px;max-width:95vw;">
    <div class="modal-header"><span class="modal-title" id="script-title">Script</span><button class="modal-close" onclick="closeModal('modal-script')">&#215;</button></div>
    <div id="script-body"></div>
    <div class="modal-footer"><button class="btn-ghost" onclick="closeModal('modal-script')">Fermer</button><button class="btn-primary" onclick="copyScriptModal()">Copier le code</button></div>
  </div>
</div>

<!-- APP SHELL -->
<div style="display:flex;height:100vh;overflow:hidden;">

<!-- SIDEBAR -->
<nav style="width:224px;min-width:224px;background:#0d1421;display:flex;flex-direction:column;height:100%;overflow-y:auto;">
  <div style="padding:18px 16px 14px;border-bottom:0.5px solid rgba(255,255,255,0.07);">
    <div style="display:flex;align-items:center;gap:9px;">
      <div style="width:30px;height:30px;background:#4361ee;border-radius:7px;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1L13 5V11L8 15L3 11V5L8 1Z" fill="white" fill-opacity="0.9"/></svg></div>
      <div><div style="font-size:14px;font-weight:600;color:white;letter-spacing:-0.01em;">LeadFlowai</div><div style="font-size:10px;color:rgba(255,255,255,0.35);margin-top:1px;">Workspace Pro</div></div>
    </div>
  </div>

  <div style="padding:14px 10px 6px;">
    <div style="font-size:10px;font-weight:500;color:rgba(255,255,255,0.25);text-transform:uppercase;letter-spacing:0.06em;padding:0 8px;margin-bottom:6px;">Produit</div>
    <button class="nav-item active" onclick="switchView('dashboard',this)"><svg class="icon" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="1" width="6" height="6" rx="1.5"/><rect x="9" y="1" width="6" height="6" rx="1.5"/><rect x="1" y="9" width="6" height="6" rx="1.5"/><rect x="9" y="9" width="6" height="6" rx="1.5"/></svg>Dashboard</button>
    <button class="nav-item" onclick="switchView('leads',this)"><svg class="icon" viewBox="0 0 16 16" fill="currentColor"><circle cx="6" cy="5" r="3"/><path d="M1 14c0-3.314 2.239-5 5-5s5 1.686 5 5H1z"/><circle cx="12" cy="4" r="2"/><path d="M12 9c1.5 0 3 .7 3 3h-4"/></svg>Leads<span id="badge-leads" style="margin-left:auto;background:rgba(67,97,238,0.3);color:#93c5fd;border-radius:99px;padding:1px 7px;font-size:10px;font-weight:600;">247</span></button>
    <button class="nav-item" onclick="switchView('conversations',this)"><svg class="icon" viewBox="0 0 16 16" fill="currentColor"><path d="M14 2H2a1 1 0 00-1 1v8a1 1 0 001 1h3l2 2 2-2h5a1 1 0 001-1V3a1 1 0 00-1-1z"/></svg>Conversations<span id="badge-unread" style="margin-left:auto;background:rgba(239,68,68,0.25);color:#fca5a5;border-radius:99px;padding:1px 7px;font-size:10px;font-weight:600;">5</span></button>
    <button class="nav-item" onclick="switchView('closing',this)"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 12L5 8L8 11L12 5L15 8"/></svg>Closing</button>
    <button class="nav-item" onclick="switchView('support',this)"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="7"/><path d="M8 5v4M8 11v1" stroke-linecap="round"/></svg>Support<span id="badge-tickets" style="margin-left:auto;background:rgba(245,158,11,0.25);color:#fcd34d;border-radius:99px;padding:1px 7px;font-size:10px;font-weight:600;">3</span></button>
  </div>

  <div style="padding:6px 10px 6px;border-top:0.5px solid rgba(255,255,255,0.07);margin-top:4px;">
    <div style="font-size:10px;font-weight:500;color:rgba(255,255,255,0.25);text-transform:uppercase;letter-spacing:0.06em;padding:8px 8px 6px;">Gestion</div>
    <button class="nav-item" onclick="switchView('agents',this)"><svg class="icon" viewBox="0 0 16 16" fill="currentColor"><rect x="2" y="6" width="4" height="8" rx="1"/><rect x="6" y="3" width="4" height="11" rx="1"/><rect x="10" y="8" width="4" height="6" rx="1"/></svg>Agents CEO</button>
    <button class="nav-item" onclick="switchView('billing',this)"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="4" width="14" height="10" rx="2"/><path d="M1 7h14"/></svg>Billing</button>
    <button class="nav-item" onclick="switchView('settings',this)"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M8 10a2 2 0 100-4 2 2 0 000 4z"/><path d="M14 8a1 1 0 01-.757.97l-1.11.278a5.02 5.02 0 01-.412.996l.567 1.006a1 1 0 01-.182 1.213l-.566.566a1 1 0 01-1.213.182l-1.006-.567a5.02 5.02 0 01-.996.412l-.278 1.11A1 1 0 018 15a1 1 0 01-.97-.757l-.278-1.11a5.02 5.02 0 01-.996-.412l-1.006.567a1 1 0 01-1.213-.182l-.566-.566a1 1 0 01-.182-1.213l.567-1.006a5.02 5.02 0 01-.412-.996l-1.11-.278A1 1 0 011 8a1 1 0 01.757-.97l1.11-.278a5.02 5.02 0 01.412-.996l-.567-1.006a1 1 0 01.182-1.213l.566-.566a1 1 0 011.213-.182l1.006.567a5.02 5.02 0 01.996-.412l.278-1.11A1 1 0 018 1a1 1 0 01.97.757l.278 1.11a5.02 5.02 0 01.996.412l1.006-.567a1 1 0 011.213.182l.566.566a1 1 0 01.182 1.213l-.567 1.006a5.02 5.02 0 01.412.996l1.11.278A1 1 0 0114 8z"/></svg>Parametres</button>
  </div>

  <div style="padding:6px 10px 6px;border-top:0.5px solid rgba(255,255,255,0.07);margin-top:4px;">
    <div style="font-size:10px;font-weight:500;color:rgba(255,255,255,0.25);text-transform:uppercase;letter-spacing:0.06em;padding:8px 8px 6px;">Plateforme</div>
    <button class="nav-item" onclick="switchView('marketplace',this)">
      <svg class="icon" viewBox="0 0 16 16" fill="currentColor"><path d="M2 2h12a1 1 0 011 1v2H1V3a1 1 0 011-1zm-1 5h14v7a1 1 0 01-1 1H2a1 1 0 01-1-1V7zm4 2v2h6V9H5z"/></svg>
      Marketplace
      <span style="margin-left:auto;background:rgba(124,58,237,0.3);color:#c4b5fd;border-radius:99px;padding:1px 7px;font-size:10px;font-weight:600;">5</span>
    </button>
    <button class="nav-item" onclick="switchView('offre',this)">
      <svg class="icon" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.1l-3.7 2.2.7-4.1-3-2.9 4.2-.7z"/></svg>
      Offre & Essai
      <span style="margin-left:auto;background:rgba(245,158,11,0.3);color:#fcd34d;border-radius:99px;padding:1px 7px;font-size:10px;font-weight:600;">7j</span>
    </button>
    <button class="nav-item" onclick="switchView('architecture',this)">
      <svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="1" y="1" width="5" height="4" rx="1"/><rect x="10" y="1" width="5" height="4" rx="1"/><rect x="5.5" y="10" width="5" height="5" rx="1"/><path d="M3.5 5v2.5H8M12.5 5v2.5H8M8 7.5V10" stroke-linecap="round"/></svg>
      Architecture
    </button>
  </div>

  <div style="margin-top:auto;padding:12px 14px 16px;border-top:0.5px solid rgba(255,255,255,0.07);">
    <div style="font-size:10px;font-weight:500;color:rgba(255,255,255,0.25);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:10px;">Statut Agents</div>
    <div style="display:flex;flex-direction:column;gap:7px;">
      <div style="display:flex;align-items:center;gap:8px;"><div class="agent-dot dot-active"></div><span style="font-size:12px;color:rgba(255,255,255,0.6);flex:1;">CEO</span><span style="font-size:10px;color:rgba(255,255,255,0.3);">Actif</span></div>
      <div style="display:flex;align-items:center;gap:8px;"><div class="agent-dot dot-active" style="animation:pulse 2s infinite;"></div><span style="font-size:12px;color:rgba(255,255,255,0.6);flex:1;">Prospecteur</span><span style="font-size:10px;color:rgba(255,255,255,0.3);">12 leads</span></div>
      <div style="display:flex;align-items:center;gap:8px;"><div class="agent-dot dot-busy"></div><span style="font-size:12px;color:rgba(255,255,255,0.6);flex:1;">Repondeur</span><span style="font-size:10px;color:rgba(255,255,255,0.3);">5 conv.</span></div>
      <div style="display:flex;align-items:center;gap:8px;"><div class="agent-dot dot-active"></div><span style="font-size:12px;color:rgba(255,255,255,0.6);flex:1;">Closing</span><span style="font-size:10px;color:rgba(255,255,255,0.3);">7 opps.</span></div>
      <div style="display:flex;align-items:center;gap:8px;"><div class="agent-dot dot-idle"></div><span style="font-size:12px;color:rgba(255,255,255,0.6);flex:1;">Support</span><span style="font-size:10px;color:rgba(255,255,255,0.3);">3 tickets</span></div>
    </div>
  </div>
</nav>

<!-- MAIN -->
<div style="flex:1;background:#f1f5f9;overflow-y:auto;display:flex;flex-direction:column;min-width:0;">
  <div style="background:#fff;border-bottom:0.5px solid var(--border);padding:13px 24px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;position:sticky;top:0;z-index:50;">
    <div><h1 id="page-title" style="font-size:15px;font-weight:600;">Dashboard</h1><p id="page-sub" style="font-size:12px;color:var(--text-secondary);margin-top:1px;">Vue d'ensemble — Aujourd'hui</p></div>
    <div style="display:flex;align-items:center;gap:10px;">
      <!-- Indicateur essai dynamique -->
      <div id="trial-banner" style="display:flex;align-items:center;gap:8px;background:#fef3c7;border:0.5px solid #fde68a;border-radius:8px;padding:5px 12px;cursor:pointer;" onclick="switchToOfferView()">
        <div style="width:6px;height:6px;background:#f59e0b;border-radius:50%;animation:pulse 1.5s infinite;"></div>
        <span style="font-size:11px;color:#92400e;font-weight:600;">Essai gratuit — <span id="trial-days">3</span> jours restants</span>
        <span style="font-size:10px;color:#b45309;padding:1px 7px;background:#fde68a;border-radius:99px;font-weight:600;margin-left:2px;">Passer Pro →</span>
      </div>
      <div id="active-banner" style="display:none;align-items:center;gap:6px;background:#dcfce7;border-radius:99px;padding:4px 10px;"><div style="width:6px;height:6px;background:#16a34a;border-radius:50%;"></div><span style="font-size:11px;color:#166534;font-weight:500;">Abonnement actif</span></div>
      <div style="width:32px;height:32px;background:#4361ee;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:13px;font-weight:600;cursor:pointer;" onclick="toast('Profil utilisateur — Acme SAS','info')">A</div>
    </div>
  </div>

  <div style="flex:1;padding:24px;">

    <!-- DASHBOARD -->
    <div id="view-dashboard" class="view active">
      <div style="display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:14px;margin-bottom:24px;">
        <div class="kpi-card"><div class="kpi-label">Leads Total</div><div class="kpi-val" id="kpi-leads">247</div><div class="kpi-delta">+43 cette semaine</div></div>
        <div class="kpi-card"><div class="kpi-label">Conversations</div><div class="kpi-val">18</div><div class="kpi-delta" id="kpi-unread">5 non lues</div></div>
        <div class="kpi-card"><div class="kpi-label">RDV ce mois</div><div class="kpi-val">12</div><div class="kpi-delta">Taux conv. 4.9%</div></div>
        <div class="kpi-card"><div class="kpi-label">Tickets ouverts</div><div class="kpi-val" id="kpi-tickets">3</div><div class="kpi-delta neg">2 en attente +24h</div></div>
        <!-- Carte Essai Gratuit -->
        <div class="kpi-card" style="background:linear-gradient(135deg,#fffbeb,#fef3c7);border-color:#fde68a;cursor:pointer;" onclick="switchToOfferView()">
          <div class="kpi-label" style="color:#92400e;">Essai Gratuit</div>
          <div style="display:flex;align-items:baseline;gap:4px;margin-bottom:8px;">
            <div class="kpi-val" id="kpi-trial-days" style="color:#d97706;">3</div>
            <div style="font-size:13px;color:#92400e;font-weight:500;">/ 7 jours</div>
          </div>
          <div style="background:#fde68a;border-radius:3px;height:5px;overflow:hidden;margin-bottom:6px;">
            <div style="width:57%;height:100%;background:#f59e0b;border-radius:3px;"></div>
          </div>
          <div style="font-size:11px;color:#92400e;font-weight:500;">Passer Pro — 99 EUR/mois →</div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 320px;gap:16px;">
        <div class="kpi-card" style="padding:0;">
          <div style="padding:16px 20px;border-bottom:0.5px solid var(--border);display:flex;align-items:center;justify-content:space-between;"><span style="font-size:14px;font-weight:600;">Logs d'activite agents</span><div style="display:flex;align-items:center;gap:10px;"><div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--text-secondary);"><div style="width:6px;height:6px;background:#22c55e;border-radius:50%;"></div>Succes</div><div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--text-secondary);"><div style="width:6px;height:6px;background:#ef4444;border-radius:50%;"></div>Erreur</div><div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--text-secondary);"><div style="width:6px;height:6px;background:#f59e0b;border-radius:50%;"></div>Alerte</div></div></div>
          <div style="padding:0 20px;" id="dash-log"></div>
        </div>
        <div style="display:flex;flex-direction:column;gap:14px;">
          <div class="kpi-card"><div class="kpi-label">Funnel de conversion</div><div style="margin-top:10px;" id="dash-pipeline"></div></div>
          <div class="kpi-card"><div class="kpi-label">Taux de reponse</div><div class="kpi-val" style="font-size:28px;color:#4361ee;">68%</div><div style="margin-top:10px;background:#e2e8f0;border-radius:4px;height:6px;overflow:hidden;"><div style="width:68%;height:100%;background:#4361ee;border-radius:4px;"></div></div><div class="kpi-delta" style="margin-top:6px;">+8% vs mois dernier</div></div>
          <div class="kpi-card" style="background:#0d1421;border:none;"><div style="font-size:11px;font-weight:500;color:rgba(255,255,255,0.45);text-transform:uppercase;letter-spacing:0.03em;margin-bottom:8px;">Prochain renouvellement</div><div style="font-size:20px;font-weight:600;color:white;">16 mai 2025</div><div style="font-size:12px;color:rgba(255,255,255,0.5);margin-top:4px;">99 EUR/mois — Stripe</div><div style="margin-top:12px;display:inline-block;padding:4px 10px;background:rgba(67,97,238,0.3);border-radius:99px;font-size:11px;color:#93c5fd;font-weight:500;">Actif</div></div>
        </div>
      </div>
    </div>

    <!-- LEADS -->
    <div id="view-leads" class="view">
      <div class="section-header">
        <div class="section-title">Base de Leads</div>
        <div style="display:flex;gap:10px;align-items:center;">
          <div class="search-wrap"><span class="search-icon">&#9906;</span><input class="input" id="lead-search" placeholder="Rechercher..." oninput="filterLeads()"/></div>
          <select class="input" id="lead-filter" style="width:150px;" onchange="filterLeads()"><option value="">Tous les statuts</option><option value="new">Nouveau</option><option value="contacted">Contacte</option><option value="replied">Repondu</option><option value="qualified">Qualifie</option><option value="client">Client</option><option value="lost">Perdu</option></select>
          <button class="btn-primary" onclick="openModal('modal-add-lead')">+ Ajouter</button>
        </div>
      </div>
      <div style="background:#fff;border:0.5px solid var(--border);border-radius:12px;overflow:hidden;">
        <div class="table-wrap"><table><thead><tr><th>Prospect</th><th>Entreprise</th><th>Source</th><th>Statut</th><th>Score</th><th>Dernier contact</th><th>Actions</th></tr></thead><tbody id="leads-table"></tbody></table></div>
        <div id="leads-empty" style="display:none;text-align:center;padding:40px;color:var(--text-secondary);font-size:13px;">Aucun lead ne correspond aux filtres.</div>
      </div>
    </div>

    <!-- CONVERSATIONS -->
    <div id="view-conversations" class="view">
      <div class="section-header"><div class="section-title">Inbox Conversations</div><button class="btn-ghost" onclick="markAllRead(this)">Tout marquer comme lu</button></div>
      <div style="background:#fff;border:0.5px solid var(--border);border-radius:12px;overflow:hidden;display:grid;grid-template-columns:280px 1fr;height:540px;">
        <div style="border-right:0.5px solid var(--border);overflow-y:auto;"><div id="conv-list"></div></div>
        <div style="display:flex;flex-direction:column;">
          <div style="padding:14px 18px;border-bottom:0.5px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
            <div><div id="conv-name" style="font-size:14px;font-weight:600;">Marie Dupont</div><div id="conv-company" style="font-size:12px;color:var(--text-secondary);">CMO chez TechVision SAS</div></div>
            <div style="display:flex;gap:8px;"><button class="btn-ghost" style="font-size:12px;padding:5px 10px;" onclick="openModal('modal-calendly')">Calendly</button><button class="btn-primary" style="font-size:12px;padding:5px 10px;" id="qualify-btn" onclick="qualifyConv(this)">Qualifier</button></div>
          </div>
          <div style="flex:1;overflow-y:auto;padding:16px 18px;display:flex;flex-direction:column;" id="message-thread"></div>
          <div style="padding:12px 18px;border-top:0.5px solid var(--border);display:flex;gap:10px;">
            <input class="input" id="reply-input" placeholder="Rediger une reponse... (Entree pour envoyer)" onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendMessage();}"/>
            <button class="btn-primary" onclick="sendMessage()">Envoyer</button>
          </div>
        </div>
      </div>
    </div>

    <!-- CLOSING -->
    <div id="view-closing" class="view">
      <div class="section-header"><div class="section-title">Pipeline de Closing</div><div style="display:flex;gap:10px;"><button class="btn-ghost" onclick="openModal('modal-calendly')">Voir Calendly</button><button class="btn-primary" onclick="openModal('modal-opp')">+ Opportunite</button></div></div>
      <div style="display:flex;gap:14px;overflow-x:auto;padding-bottom:8px;" id="kanban-board"></div>
    </div>

    <!-- SUPPORT — TRI PAR PRIORITE + SLA -->
    <div id="view-support" class="view">
      <div class="section-header">
        <div>
          <div class="section-title">Tickets Support</div>
          <div style="font-size:12px;color:var(--text-secondary);margin-top:2px;">Tri automatique par priorite — SLA : Urgent 4h / Moyen 12h / Faible 48h</div>
        </div>
        <button class="btn-primary" onclick="toggleNewTicketForm()">+ Nouveau ticket</button>
      </div>
      <div id="new-ticket-form" style="display:none;background:#fff;border:0.5px solid var(--border);border-radius:12px;padding:16px 20px;margin-bottom:14px;" class="fade-in">
        <div style="font-size:14px;font-weight:600;margin-bottom:14px;">Nouveau ticket</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">
          <div><label class="form-label">Contact</label><input class="input" id="nt-contact" placeholder="Nom du client"/></div>
          <div><label class="form-label">Priorite</label><select class="form-select" id="nt-priority"><option value="high">Haute — Urgent</option><option value="med">Moyenne</option><option value="low">Faible</option></select></div>
        </div>
        <div style="margin-bottom:12px;"><label class="form-label">Sujet</label><input class="input" id="nt-subject" placeholder="Decrivez le probleme..."/></div>
        <div style="display:flex;justify-content:flex-end;gap:10px;"><button class="btn-ghost" onclick="toggleNewTicketForm()">Annuler</button><button class="btn-primary" onclick="submitNewTicket(this)">Creer le ticket</button></div>
      </div>
      <div style="background:#fff;border:0.5px solid var(--border);border-radius:12px;overflow:hidden;">
        <div class="table-wrap"><table><thead><tr><th></th><th>ID</th><th>Sujet</th><th>Contact</th><th>Priorite</th><th>Statut</th><th>SLA restant</th><th>Actions</th></tr></thead><tbody id="tickets-table"></tbody></table></div>
      </div>
    </div>

    <!-- AGENTS -->
    <div id="view-agents" class="view">
      <div class="section-header"><div class="section-title">Supervision — Agent CEO</div><div style="font-size:12px;color:var(--text-secondary);">Orchestration en temps reel</div></div>
      <div style="display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px;margin-bottom:20px;" id="agent-cards"></div>
      <div class="kpi-card" style="padding:0;">
        <div style="padding:14px 20px;border-bottom:0.5px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
          <span style="font-size:14px;font-weight:600;">Journal d'orchestration complet</span>
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--text-secondary);"><div style="width:6px;height:6px;background:#22c55e;border-radius:50%;"></div>Succes</div>
            <div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--text-secondary);"><div style="width:6px;height:6px;background:#ef4444;border-radius:50%;"></div>Erreur</div>
            <div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--text-secondary);"><div style="width:6px;height:6px;background:#f59e0b;border-radius:50%;"></div>Alerte</div>
          </div>
        </div>
        <div style="padding:0 20px;" id="full-log"></div>
      </div>
    </div>

    <!-- BILLING -->
    <div id="view-billing" class="view">
      <div class="section-title" style="margin-bottom:20px;">Abonnement & Facturation</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px;">
        <div class="billing-card">
          <div style="font-size:11px;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:12px;">Plan actuel</div>
          <div style="font-size:28px;font-weight:600;color:white;margin-bottom:4px;">99 EUR<span style="font-size:14px;font-weight:400;opacity:0.6;">/mois</span></div>
          <div style="font-size:13px;color:rgba(255,255,255,0.55);margin-bottom:16px;">LeadFlowai Pro — Agents illimites</div>
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;"><div style="width:8px;height:8px;background:#22c55e;border-radius:50%;"></div><span style="font-size:13px;color:rgba(255,255,255,0.8);">Abonnement actif</span></div>
          <div style="font-size:12px;color:rgba(255,255,255,0.4);">Prochain prelevement : 16 mai 2025</div>
          <button style="margin-top:16px;background:rgba(255,255,255,0.1);border:0.5px solid rgba(255,255,255,0.15);border-radius:8px;padding:8px 16px;color:rgba(255,255,255,0.7);font-size:13px;cursor:pointer;" onclick="toast('Redirection vers le portail Stripe...','info')">Gerer via Stripe</button>
        </div>
        <div class="kpi-card"><div style="font-size:14px;font-weight:600;margin-bottom:12px;">Inclus dans votre plan</div><div id="features-list"></div></div>
      </div>
      <div class="kpi-card" style="padding:0;">
        <div style="padding:14px 20px;border-bottom:0.5px solid var(--border);"><span style="font-size:14px;font-weight:600;">Historique de facturation</span></div>
        <table style="width:100%;border-collapse:collapse;font-size:13px;">
          <thead><tr><th style="text-align:left;padding:10px 20px;font-size:11px;font-weight:500;color:var(--text-secondary);border-bottom:0.5px solid var(--border);text-transform:uppercase;letter-spacing:0.04em;">Periode</th><th style="text-align:left;padding:10px;font-size:11px;font-weight:500;color:var(--text-secondary);border-bottom:0.5px solid var(--border);text-transform:uppercase;letter-spacing:0.04em;">Montant</th><th style="text-align:left;padding:10px;font-size:11px;font-weight:500;color:var(--text-secondary);border-bottom:0.5px solid var(--border);text-transform:uppercase;letter-spacing:0.04em;">Statut</th><th style="text-align:left;padding:10px;font-size:11px;font-weight:500;color:var(--text-secondary);border-bottom:0.5px solid var(--border);text-transform:uppercase;letter-spacing:0.04em;">Facture</th></tr></thead>
          <tbody>
            <tr><td style="padding:11px 20px;border-bottom:0.5px solid var(--border);">16 avr 2025</td><td style="padding:11px 10px;border-bottom:0.5px solid var(--border);">99,00 EUR</td><td style="padding:11px 10px;border-bottom:0.5px solid var(--border);"><span class="badge badge-replied">Paye</span></td><td style="padding:11px 10px;border-bottom:0.5px solid var(--border);"><button class="btn-ghost" style="font-size:11px;padding:3px 9px;" onclick="toast('Telechargement en cours...','success')">Telecharger</button></td></tr>
            <tr><td style="padding:11px 20px;border-bottom:0.5px solid var(--border);">16 mar 2025</td><td style="padding:11px 10px;border-bottom:0.5px solid var(--border);">99,00 EUR</td><td style="padding:11px 10px;border-bottom:0.5px solid var(--border);"><span class="badge badge-replied">Paye</span></td><td style="padding:11px 10px;border-bottom:0.5px solid var(--border);"><button class="btn-ghost" style="font-size:11px;padding:3px 9px;" onclick="toast('Telechargement en cours...','success')">Telecharger</button></td></tr>
            <tr><td style="padding:11px 20px;">Essai gratuit</td><td style="padding:11px 10px;">0,00 EUR</td><td style="padding:11px 10px;"><span class="badge badge-linkedin">7 jours</span></td><td style="padding:11px 10px;color:var(--text-secondary);">—</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- SETTINGS -->
    <div id="view-settings" class="view">
      <div class="section-title" style="margin-bottom:20px;">Parametres du Workspace</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
        <div class="kpi-card">
          <div style="font-size:14px;font-weight:600;margin-bottom:16px;">Informations societe</div>
          <div style="display:flex;flex-direction:column;gap:12px;">
            <div><label class="form-label">Nom de l'entreprise</label><input class="input" id="s-company" value="Acme SAS"/></div>
            <div><label class="form-label">Site web</label><input class="input" id="s-site" value="https://acme.fr"/></div>
            <div><label class="form-label">Persona cible</label><input class="input" id="s-persona" value="CMO, VP Sales, Fondateurs B2B SaaS"/></div>
            <div><label class="form-label">Lien Calendly</label><input class="input" id="s-calendly" value="https://calendly.com/acme/demo-30min"/></div>
          </div>
        </div>
        <div class="kpi-card"><div style="font-size:14px;font-weight:600;margin-bottom:16px;">Comportement des agents</div><div style="display:flex;flex-direction:column;gap:14px;" id="agent-toggles"></div></div>
        <div class="kpi-card"><div style="font-size:14px;font-weight:600;margin-bottom:16px;">Ton de communication</div><div style="display:flex;flex-direction:column;gap:6px;" id="tone-options"></div></div>
        <div class="kpi-card">
          <div style="font-size:14px;font-weight:600;margin-bottom:12px;">Regles de delegation CEO</div>
          <div style="display:flex;flex-direction:column;gap:8px;font-size:13px;" id="ceo-rules"></div>
          <button style="margin-top:8px;width:100%;padding:10px;background:var(--accent-light);border:none;border-radius:8px;color:#4361ee;font-size:13px;cursor:pointer;text-align:left;" onclick="addCeoRule()">+ Ajouter une regle</button>
        </div>
      </div>
      <div style="margin-top:16px;display:flex;justify-content:flex-end;gap:10px;"><button class="btn-ghost" onclick="toast('Modifications annulees','warn')">Annuler</button><button class="btn-primary" id="save-btn" onclick="saveSettings(this)">Sauvegarder les changements</button></div>
    </div>

    <!-- MARKETPLACE -->
    <div id="view-marketplace" class="view">
      <div class="section-header">
        <div>
          <div class="section-title">Marketplace — Agents AI Prets a l'Emploi</div>
          <div style="font-size:12px;color:var(--text-secondary);margin-top:2px;">5 agents actifs inclus dans votre plan Pro — tout est automatise</div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;background:#dcfce7;border-radius:99px;padding:5px 12px;"><div style="width:6px;height:6px;background:#16a34a;border-radius:50%;"></div><span style="font-size:12px;font-weight:600;color:#166534;">Tous actifs</span></div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-bottom:24px;" id="mkt-cards"></div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
        <div class="kpi-card">
          <div style="font-size:14px;font-weight:600;margin-bottom:16px;">Flux d'orchestration CEO</div>
          <div style="display:flex;flex-direction:column;gap:10px;font-size:13px;">
            <div style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:#f5f3ff;border-radius:8px;border-left:3px solid #7c3aed;"><div style="font-weight:500;color:#5b21b6;flex:1;">Lead entrant detect</div><div style="font-size:11px;color:#7c3aed;">CEO analyse</div></div>
            <div style="display:flex;justify-content:center;"><div style="font-size:18px;color:var(--text-secondary);">&#8595;</div></div>
            <div style="display:flex;gap:8px;">
              <div style="flex:1;padding:10px;background:#e0f2fe;border-radius:8px;font-size:12px;font-weight:500;color:#0369a1;text-align:center;">Score &lt; 70<br><span style="font-weight:400;color:#0369a1;">→ Repondeur</span></div>
              <div style="flex:1;padding:10px;background:#fef3c7;border-radius:8px;font-size:12px;font-weight:500;color:#92400e;text-align:center;">Score ≥ 70<br><span style="font-weight:400;color:#92400e;">→ Closing</span></div>
              <div style="flex:1;padding:10px;background:#fee2e2;border-radius:8px;font-size:12px;font-weight:500;color:#991b1b;text-align:center;">Ticket entrant<br><span style="font-weight:400;color:#991b1b;">→ Support</span></div>
            </div>
            <div style="display:flex;justify-content:center;"><div style="font-size:18px;color:var(--text-secondary);">&#8595;</div></div>
            <div style="padding:10px 12px;background:#dcfce7;border-radius:8px;border-left:3px solid #16a34a;"><span style="font-weight:500;color:#166534;">Firestore mis a jour + log enregistre</span></div>
          </div>
        </div>
        <div class="kpi-card">
          <div style="font-size:14px;font-weight:600;margin-bottom:16px;">Integrations actives</div>
          <div style="display:flex;flex-direction:column;gap:10px;">
            <div style="display:flex;align-items:center;justify-content:space-between;padding:12px;background:var(--bg-secondary);border-radius:8px;">
              <div style="display:flex;align-items:center;gap:10px;"><div style="width:30px;height:30px;background:#e0f2fe;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#0369a1;">Li</div><div style="font-size:13px;font-weight:500;">LinkedIn / Apollo</div></div>
              <div style="display:flex;align-items:center;gap:6px;"><div class="agent-dot dot-active"></div><span style="font-size:11px;color:#16a34a;font-weight:500;">Connecte</span></div>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;padding:12px;background:var(--bg-secondary);border-radius:8px;">
              <div style="display:flex;align-items:center;gap:10px;"><div style="width:30px;height:30px;background:#f5f3ff;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#5b21b6;">FB</div><div style="font-size:13px;font-weight:500;">Firebase Firestore</div></div>
              <div style="display:flex;align-items:center;gap:6px;"><div class="agent-dot dot-active"></div><span style="font-size:11px;color:#16a34a;font-weight:500;">Connecte</span></div>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;padding:12px;background:var(--bg-secondary);border-radius:8px;">
              <div style="display:flex;align-items:center;gap:10px;"><div style="width:30px;height:30px;background:#dbeafe;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#1e40af;">St</div><div style="font-size:13px;font-weight:500;">Stripe Billing</div></div>
              <div style="display:flex;align-items:center;gap:6px;"><div class="agent-dot dot-active"></div><span style="font-size:11px;color:#16a34a;font-weight:500;">Connecte</span></div>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;padding:12px;background:var(--bg-secondary);border-radius:8px;">
              <div style="display:flex;align-items:center;gap:10px;"><div style="width:30px;height:30px;background:#dcfce7;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#166534;">Ca</div><div style="font-size:13px;font-weight:500;">Calendly</div></div>
              <div style="display:flex;align-items:center;gap:6px;"><div class="agent-dot dot-active"></div><span style="font-size:11px;color:#16a34a;font-weight:500;">Connecte</span></div>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;padding:12px;background:var(--bg-secondary);border-radius:8px;">
              <div style="display:flex;align-items:center;gap:10px;"><div style="width:30px;height:30px;background:#fef3c7;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#92400e;">Gu</div><div style="font-size:13px;font-weight:500;">Gumroad</div></div>
              <div style="display:flex;align-items:center;gap:6px;"><div class="agent-dot dot-idle"></div><span style="font-size:11px;color:#94a3b8;font-weight:500;">Non configure</span><button class="btn-ghost" style="font-size:10px;padding:2px 8px;margin-left:6px;" onclick="toast('Ouvrez les Parametres pour configurer Gumroad','info')">Configurer</button></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ARCHITECTURE -->
    <div id="view-architecture" class="view">
      <div class="section-header">
        <div>
          <div class="section-title">Architecture Technique</div>
          <div style="font-size:12px;color:var(--text-secondary);margin-top:2px;">Schema, scripts Python, checklist de lancement, budget operationnel</div>
        </div>
        <button class="btn-ghost" onclick="toast('Export PDF en cours de preparation...','info')">Exporter en PDF</button>
      </div>

      <!-- Schema -->
      <div class="kpi-card" style="background:#0f172a;border:none;padding:28px;margin-bottom:20px;">
        <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.07em;color:rgba(255,255,255,0.3);margin-bottom:20px;text-align:center;">Schema d'orchestration — LeadFlowai x Paperclip</div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:16px;">
          <div class="arch-node arch-ceo">Agent CEO — Superviseur & routeur</div>
          <div style="color:rgba(255,255,255,0.2);font-size:12px;">&#8595; Delegation intelligente &#8595;</div>
          <div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;">
            <div class="arch-node arch-agent">Prospecteur</div>
            <div class="arch-node arch-agent">Repondeur</div>
            <div class="arch-node arch-agent">Closing</div>
            <div class="arch-node arch-agent">Support</div>
          </div>
          <div style="color:rgba(255,255,255,0.2);font-size:12px;">&#8595; Appels API &#8595;</div>
          <div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;">
            <div class="arch-node arch-platform">LinkedIn / Apollo</div>
            <div class="arch-node arch-firebase">Firebase Firestore</div>
            <div class="arch-node arch-stripe">Stripe</div>
            <div class="arch-node arch-platform">Calendly</div>
            <div class="arch-node arch-platform">Gumroad</div>
          </div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px;">
        <!-- Scripts -->
        <div class="kpi-card" style="padding:0;overflow:hidden;">
          <div style="padding:14px 20px;border-bottom:0.5px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
            <span style="font-size:14px;font-weight:600;">Scripts Python prets a deployer</span>
          </div>
          <div style="padding:14px 20px;display:flex;flex-direction:column;gap:10px;" id="scripts-list"></div>
        </div>

        <!-- Checklist -->
        <div class="kpi-card" style="padding:0;overflow:hidden;">
          <div style="padding:14px 20px;border-bottom:0.5px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
            <span style="font-size:14px;font-weight:600;">Checklist de lancement</span>
            <span style="font-size:12px;color:var(--text-secondary);" id="ck-progress">0 / 8 etapes</span>
          </div>
          <div style="padding:14px 20px;max-height:360px;overflow-y:auto;" id="arch-checklist"></div>
        </div>
      </div>

      <!-- Budget -->
      <div class="kpi-card">
        <div style="font-size:14px;font-weight:600;margin-bottom:16px;">Budget operationnel — Objectif &lt; 500 USD/mois</div>
        <div id="budget-list"></div>
        <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-top:0.5px solid var(--border);margin-top:4px;">
          <span style="font-size:13px;font-weight:600;">Total mensuel estime</span>
          <span style="font-size:16px;font-weight:700;color:#4361ee;">437 USD / mois</span>
        </div>
        <div style="margin-top:12px;padding:12px 14px;background:#eef0fd;border-radius:8px;font-size:13px;color:#4361ee;">Breakeven a 5 clients payants (495 EUR/mois). Ne lancez pas les LinkedIn Ads avant de valider le funnel sur 10 leads manuels.</div>
      </div>
    </div>

    <!-- OFFRE & ESSAI GRATUIT -->
    <div id="view-offre" class="view">
      <div class="section-header">
        <div>
          <div class="section-title">Offre & Essai Gratuit</div>
          <div style="font-size:12px;color:var(--text-secondary);margin-top:2px;">Parcours client, page de vente Gumroad et gestion de l'essai Stripe</div>
        </div>
        <div style="display:flex;gap:10px;">
          <button class="btn-ghost" onclick="activatePro()">Activer Pro maintenant</button>
          <button class="btn-primary" onclick="openScript(3)">Voir landing page</button>
        </div>
      </div>

      <!-- Banniere essai -->
      <div id="trial-full-banner" style="background:linear-gradient(135deg,#1e293b,#0d1421);border-radius:12px;padding:24px 28px;margin-bottom:20px;display:flex;align-items:center;justify-content:space-between;">
        <div>
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:rgba(255,255,255,0.4);margin-bottom:8px;">Statut de l'abonnement</div>
          <div id="trial-status-label" style="font-size:22px;font-weight:700;color:white;margin-bottom:4px;">Essai gratuit en cours — <span id="trial-days-full">3</span> jours restants</div>
          <div style="font-size:13px;color:rgba(255,255,255,0.5);">Acces complet a toutes les fonctionnalites. Aucune carte requise pour l'essai.</div>
          <div style="margin-top:12px;background:rgba(255,255,255,0.1);border-radius:6px;height:6px;overflow:hidden;width:200px;">
            <div id="trial-progress-bar" style="width:57%;height:100%;background:#f59e0b;border-radius:6px;transition:width .5s;"></div>
          </div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:28px;font-weight:800;color:white;margin-bottom:4px;">99 EUR<span style="font-size:14px;font-weight:400;opacity:0.5;">/mois</span></div>
          <div style="font-size:12px;color:rgba(255,255,255,0.4);margin-bottom:16px;">Apres l'essai — annulable a tout moment</div>
          <button class="btn-primary" style="padding:10px 24px;font-size:14px;" onclick="activatePro()">Passer a Pro maintenant</button>
        </div>
      </div>

      <!-- Parcours client -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px;">
        <div class="kpi-card" style="padding:0;overflow:hidden;">
          <div style="padding:14px 20px;border-bottom:0.5px solid var(--border);">
            <div style="font-size:14px;font-weight:600;">Parcours client — Vue macro</div>
          </div>
          <div style="padding:16px 20px;">
            <div style="display:flex;flex-direction:column;gap:0;">
              <!-- C1 -->
              <div style="display:flex;align-items:center;gap:12px;padding:10px 12px;background:#eef0fd;border-radius:8px 8px 0 0;border:0.5px solid #c7d2fe;">
                <div style="width:26px;height:26px;background:#4361ee;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:11px;font-weight:700;flex-shrink:0;">C1</div>
                <div style="flex:1;"><div style="font-size:13px;font-weight:500;">Essai Gratuit 7 Jours</div><div style="font-size:11px;color:var(--text-secondary);">Inscription — aucune CB requise</div></div>
                <span style="font-size:10px;background:#4361ee;color:white;padding:2px 7px;border-radius:99px;font-weight:600;">Actuel</span>
              </div>
              <div style="display:flex;justify-content:center;background:#f1f5f9;width:100%;padding:4px 0;border-left:0.5px solid #c7d2fe;border-right:0.5px solid #c7d2fe;"><span style="font-size:16px;color:#94a3b8;">↓</span></div>
              <!-- C2 -->
              <div style="display:flex;align-items:center;gap:12px;padding:10px 12px;background:#f8fafc;border:0.5px solid var(--border);border-top:none;">
                <div style="width:26px;height:26px;background:#e2e8f0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;">C2</div>
                <div style="flex:1;"><div style="font-size:13px;font-weight:500;">Tableau de Bord</div><div style="font-size:11px;color:var(--text-secondary);">Leads, conversations, KPIs en temps reel</div></div>
              </div>
              <div style="display:flex;justify-content:center;background:#f1f5f9;border-left:0.5px solid var(--border);border-right:0.5px solid var(--border);padding:4px 0;"><span style="font-size:16px;color:#94a3b8;">↓</span></div>
              <!-- C3 -->
              <div style="display:flex;align-items:center;gap:12px;padding:10px 12px;background:#f8fafc;border:0.5px solid var(--border);border-top:none;">
                <div style="width:26px;height:26px;background:#e2e8f0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;">C3</div>
                <div style="flex:1;"><div style="font-size:13px;font-weight:500;">Prospection Automatisee</div><div style="font-size:11px;color:var(--text-secondary);">50 messages/jour LinkedIn via Agent Prospecteur</div></div>
                <div style="font-size:10px;background:#e0f2fe;color:#0369a1;padding:2px 7px;border-radius:4px;font-weight:500;">LinkedIn</div>
              </div>
              <div style="display:flex;justify-content:center;background:#f1f5f9;border-left:0.5px solid var(--border);border-right:0.5px solid var(--border);padding:4px 0;"><span style="font-size:16px;color:#94a3b8;">↓</span></div>
              <!-- C4 -->
              <div style="display:flex;align-items:center;gap:12px;padding:10px 12px;background:#f8fafc;border:0.5px solid var(--border);border-top:none;">
                <div style="width:26px;height:26px;background:#e2e8f0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;">C4</div>
                <div style="flex:1;"><div style="font-size:13px;font-weight:500;">Reponses & Suivi</div><div style="font-size:11px;color:var(--text-secondary);">Agent Repondeur — relances J+3, J+7 automatiques</div></div>
              </div>
              <div style="display:flex;justify-content:center;background:#f1f5f9;border-left:0.5px solid var(--border);border-right:0.5px solid var(--border);padding:4px 0;"><span style="font-size:16px;color:#94a3b8;">↓</span></div>
              <!-- C5 -->
              <div style="display:flex;align-items:center;gap:12px;padding:10px 12px;background:#f8fafc;border:0.5px solid var(--border);border-top:none;">
                <div style="width:26px;height:26px;background:#e2e8f0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;">C5</div>
                <div style="flex:1;"><div style="font-size:13px;font-weight:500;">Conversion en Client</div><div style="font-size:11px;color:var(--text-secondary);">Agent Closing — Calendly + paiement Stripe</div></div>
                <div style="font-size:10px;background:#dbeafe;color:#1e40af;padding:2px 7px;border-radius:4px;font-weight:500;">Stripe</div>
              </div>
              <div style="display:flex;justify-content:center;background:#f1f5f9;border-left:0.5px solid var(--border);border-right:0.5px solid var(--border);padding:4px 0;"><span style="font-size:16px;color:#94a3b8;">↓</span></div>
              <!-- C6 -->
              <div style="display:flex;align-items:center;gap:12px;padding:10px 12px;background:#dcfce7;border-radius:0 0 8px 8px;border:0.5px solid #86efac;border-top:none;">
                <div style="width:26px;height:26px;background:#16a34a;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:11px;font-weight:700;flex-shrink:0;">C6</div>
                <div style="flex:1;"><div style="font-size:13px;font-weight:500;color:#166534;">Abonnement Pro Actif</div><div style="font-size:11px;color:#16a34a;">99 EUR/mois — tous les agents actifs</div></div>
                <span style="font-size:10px;background:#16a34a;color:white;padding:2px 7px;border-radius:99px;font-weight:600;">Objectif</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Tableau fonctionnalites -->
        <div>
          <div class="kpi-card" style="padding:0;overflow:hidden;margin-bottom:14px;">
            <div style="padding:14px 20px;border-bottom:0.5px solid var(--border);font-size:14px;font-weight:600;">Ce que voit le client</div>
            <table style="width:100%;border-collapse:collapse;font-size:13px;">
              <thead><tr><th style="text-align:left;padding:9px 14px;font-size:11px;font-weight:500;color:var(--text-secondary);border-bottom:0.5px solid var(--border);text-transform:uppercase;letter-spacing:0.04em;">Fonctionnalite</th><th style="text-align:left;padding:9px 10px;font-size:11px;font-weight:500;color:var(--text-secondary);border-bottom:0.5px solid var(--border);text-transform:uppercase;letter-spacing:0.04em;">Description</th></tr></thead>
              <tbody>
                <tr><td style="padding:9px 14px;border-bottom:0.5px solid var(--border);font-weight:500;">Statut des Leads</td><td style="padding:9px 10px;border-bottom:0.5px solid var(--border);color:var(--text-secondary);">Nouveau → Contacte → Repondu → Qualifie → Client</td></tr>
                <tr><td style="padding:9px 14px;border-bottom:0.5px solid var(--border);font-weight:500;">Messages Envoyes</td><td style="padding:9px 10px;border-bottom:0.5px solid var(--border);color:var(--text-secondary);">Nombre de messages + taux de reponse en temps reel</td></tr>
                <tr><td style="padding:9px 14px;border-bottom:0.5px solid var(--border);font-weight:500;">Prochaines Actions</td><td style="padding:9px 10px;border-bottom:0.5px solid var(--border);color:var(--text-secondary);">Relances, RDV Calendly, factures Stripe planifiees</td></tr>
                <tr><td style="padding:9px 14px;border-bottom:0.5px solid var(--border);font-weight:500;">Factures</td><td style="padding:9px 10px;border-bottom:0.5px solid var(--border);color:var(--text-secondary);">Historique paiements + prochaine echeance</td></tr>
                <tr><td style="padding:9px 14px;font-weight:500;">Support</td><td style="padding:9px 10px;color:var(--text-secondary);">Chatbot FAQ + tickets escalades si besoin</td></tr>
              </tbody>
            </table>
          </div>
          <div class="kpi-card" style="padding:0;overflow:hidden;">
            <div style="padding:14px 20px;border-bottom:0.5px solid var(--border);font-size:14px;font-weight:600;">Checklist mise en place essai</div>
            <div style="padding:12px 16px;display:flex;flex-direction:column;gap:8px;" id="trial-checklist"></div>
          </div>
        </div>
      </div>

      <!-- Processus invisible -->
      <div class="kpi-card" style="padding:0;overflow:hidden;">
        <div style="padding:14px 20px;border-bottom:0.5px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
          <span style="font-size:14px;font-weight:600;">Processus automatise — invisible pour le client</span>
          <span style="font-size:12px;color:var(--text-secondary);">Tourne 24h/24 en arriere-plan</span>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:13px;">
          <thead><tr><th style="text-align:left;padding:10px 14px;font-size:11px;font-weight:500;color:var(--text-secondary);border-bottom:0.5px solid var(--border);text-transform:uppercase;letter-spacing:0.04em;">Agent</th><th style="text-align:left;padding:10px 10px;font-size:11px;font-weight:500;color:var(--text-secondary);border-bottom:0.5px solid var(--border);text-transform:uppercase;letter-spacing:0.04em;">Role</th><th style="text-align:left;padding:10px 10px;font-size:11px;font-weight:500;color:var(--text-secondary);border-bottom:0.5px solid var(--border);text-transform:uppercase;letter-spacing:0.04em;">Actions automatiques</th></tr></thead>
          <tbody>
            <tr><td style="padding:11px 14px;border-bottom:0.5px solid var(--border);"><span class="agent-chip chip-prosp">Prospecteur</span></td><td style="padding:11px 10px;border-bottom:0.5px solid var(--border);">Trouve et contacte des leads LinkedIn</td><td style="padding:11px 10px;border-bottom:0.5px solid var(--border);color:var(--text-secondary);">50 messages/jour personnalises — pause anti-ban 30-90s</td></tr>
            <tr><td style="padding:11px 14px;border-bottom:0.5px solid var(--border);"><span class="agent-chip chip-resp">Repondeur</span></td><td style="padding:11px 10px;border-bottom:0.5px solid var(--border);">Repond aux messages des leads</td><td style="padding:11px 10px;border-bottom:0.5px solid var(--border);color:var(--text-secondary);">Templates IA + stockage Firebase + relances J+3, J+7</td></tr>
            <tr><td style="padding:11px 14px;border-bottom:0.5px solid var(--border);"><span class="agent-chip chip-clos">Closing</span></td><td style="padding:11px 10px;border-bottom:0.5px solid var(--border);">Convertit les leads en clients</td><td style="padding:11px 10px;border-bottom:0.5px solid var(--border);color:var(--text-secondary);">Calendly auto (score &gt;70) + Stripe Checkout + facture</td></tr>
            <tr><td style="padding:11px 14px;"><span class="agent-chip chip-supp">Support</span></td><td style="padding:11px 10px;">Gere les tickets</td><td style="padding:11px 10px;color:var(--text-secondary);">FAQ auto + escalade manuelle si complexe + SLA 4h/12h/48h</td></tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</div>
</div>

<script>
/* ── STATE ──────────────────────────────────────────────── */
let leads=[
  {id:1,name:"Marie Dupont",company:"TechVision SAS",role:"CMO",source:"linkedin",status:"replied",score:82,lastContact:"il y a 14 min"},
  {id:2,name:"Thomas Lefebvre",company:"Scalify",role:"Fondateur",source:"linkedin",status:"contacted",score:65,lastContact:"il y a 1h"},
  {id:3,name:"Sophie Martin",company:"DataSync",role:"VP Sales",source:"website",status:"new",score:47,lastContact:"il y a 2h"},
  {id:4,name:"Julien Bernard",company:"Growthlab",role:"CEO",source:"linkedin",status:"qualified",score:91,lastContact:"hier"},
  {id:5,name:"Camille Rousseau",company:"Nexora",role:"Directrice Mktg",source:"manual",status:"new",score:38,lastContact:"il y a 3h"},
  {id:6,name:"Antoine Petit",company:"CloudPeak",role:"CTO",source:"website",status:"replied",score:74,lastContact:"il y a 5h"},
  {id:7,name:"Lea Girard",company:"SalesForge",role:"SDR Lead",source:"linkedin",status:"contacted",score:53,lastContact:"avant-hier"},
  {id:8,name:"Nicolas Moreau",company:"Kando AI",role:"COO",source:"linkedin",status:"qualified",score:88,lastContact:"il y a 2 jours"},
  {id:9,name:"Emma Leroy",company:"Pivotly",role:"Responsable Comm.",source:"website",status:"lost",score:22,lastContact:"il y a 4 jours"},
  {id:10,name:"Paul Blanc",company:"RevMap",role:"Head of Growth",source:"linkedin",status:"client",score:94,lastContact:"il y a 30 min"},
];
let nextLid=11;
let conversations=[
  {id:1,name:"Marie Dupont",company:"TechVision SAS",preview:"La partie closing m'interesse...",unread:true,time:"09:31",qualified:false},
  {id:2,name:"Julien Bernard",company:"Growthlab",preview:"Quand pouvez-vous planifier une demo ?",unread:true,time:"08:54",qualified:false},
  {id:3,name:"Nicolas Moreau",company:"Kando AI",preview:"Merci pour les infos, je reviens vers vous",unread:false,time:"Hier",qualified:true},
  {id:4,name:"Antoine Petit",company:"CloudPeak",preview:"Notre equipe a besoin de plus de details",unread:true,time:"Hier",qualified:false},
  {id:5,name:"Thomas Lefebvre",company:"Scalify",preview:"Ok, j'ai vu votre message",unread:false,time:"Lundi",qualified:false},
];
let activeConv=1;
let messages=[
  {cid:1,from:"lead",text:"Bonjour, j'ai vu votre profil et j'ai quelques questions sur votre solution de prospection automatisee.",t:"09:14"},
  {cid:1,from:"agent",text:"Bonjour Marie, avec plaisir ! Notre plateforme automatise l'ensemble du cycle de prospection grace a 5 agents IA specialises. Qu'est-ce qui vous interesse le plus ?",t:"09:17"},
  {cid:1,from:"lead",text:"La partie closing m'interesse — on perd beaucoup de leads en phase finale. Comment ca fonctionne ?",t:"09:31"},
];
let kanban=[
  {col:"Warm",color:"#f59e0b",cards:[{name:"Sophie Martin",co:"DataSync",score:47},{name:"Paul Blanc",co:"RevMap",score:61},{name:"Lea Girard",co:"SalesForge",score:53}]},
  {col:"Calendly envoye",color:"#4361ee",cards:[{name:"Thomas Lefebvre",co:"Scalify",score:65},{name:"Antoine Petit",co:"CloudPeak",score:74}]},
  {col:"RDV confirme",color:"#22c55e",cards:[{name:"Marie Dupont",co:"TechVision SAS",score:82},{name:"Nicolas Moreau",co:"Kando AI",score:88},{name:"Camille Rousseau",co:"Nexora",score:38},{name:"Emma Leroy",co:"Pivotly",score:72}]},
  {col:"Gagne",color:"#059669",cards:[{name:"Julien Bernard",co:"Growthlab",score:91},{name:"Sophie Blanc",co:"InnoTech",score:85},{name:"Marc Duval",co:"Fluxio",score:78}]},
];
// Tickets triés par priorité : high > med > low
let tickets=[
  {id:1042,subject:"Probleme de synchronisation LinkedIn",contact:"Thomas Lefebvre",priority:"high",status:"open",date:"Aujourd'hui",sla:"2h"},
  {id:1041,subject:"Question sur la facturation mensuelle",contact:"Emma Leroy",priority:"med",status:"progress",date:"Hier",sla:"8h"},
  {id:1040,subject:"Export CSV des leads non fonctionnel",contact:"Sophie Martin",priority:"med",status:"open",date:"Hier",sla:"6h"},
  {id:1039,subject:"Calendly ne se connecte pas",contact:"Julien Bernard",priority:"low",status:"resolved",date:"Lundi",sla:"—"},
];
let nextTid=1043;
let currentTid=null;
// Logs avec type : success / error / warn / info
const logs=[
  {agent:"CEO",chip:"chip-ceo",type:"info",action:"Regle activee : lead score > 70 route vers Closing",time:"09:45"},
  {agent:"Prospecteur",chip:"chip-prosp",type:"success",action:"12 leads extraits depuis LinkedIn (filtre : SaaS B2B, 50-500 emp.)",time:"09:43"},
  {agent:"Repondeur",chip:"chip-resp",type:"error",action:"Echec envoi message Thomas Lefebvre — quota LinkedIn atteint. Relance programmee 14h.",time:"09:38"},
  {agent:"Closing",chip:"chip-clos",type:"success",action:"Lien Calendly envoye a Marie Dupont (score 82)",time:"09:34"},
  {agent:"CEO",chip:"chip-ceo",type:"warn",action:"Lead #107 score 41 < seuil 70 — reroute vers Repondeur au lieu de Closing",time:"09:17"},
  {agent:"Support",chip:"chip-supp",type:"success",action:"Ticket #1041 marque resolu — aucune relance necessaire",time:"09:03"},
  {agent:"Prospecteur",chip:"chip-prosp",type:"warn",action:"Enrichissement partiel : 8 emails trouves sur 12 leads (4 introuvables)",time:"08:55"},
  {agent:"Closing",chip:"chip-clos",type:"success",action:"Julien Bernard : RDV confirme Calendly — 18 avril 14h30",time:"08:49"},
];
const agents=[
  {name:"CEO",role:"Superviseur",status:"active",actions:142,chip:"chip-ceo",dot:"dot-active"},
  {name:"Prospecteur",role:"Recherche leads",status:"running",actions:87,chip:"chip-prosp",dot:"dot-active"},
  {name:"Repondeur",role:"Inbox",status:"busy",actions:213,chip:"chip-resp",dot:"dot-busy"},
  {name:"Closing",role:"Conversion",status:"active",actions:64,chip:"chip-clos",dot:"dot-active"},
  {name:"Support",role:"Tickets SAV",status:"idle",actions:31,chip:"chip-supp",dot:"dot-idle"},
];
const features=["5 agents IA actifs","Prospection LinkedIn automatisee","Inbox centralise multi-canal","Pipeline Closing avec Calendly","Support tickets SAV","Logs CEO en temps reel","Integration Stripe & webhooks","Export CSV illimite"];
const tgls=[
  {l:"Prospection automatique",s:"Recherche quotidienne de leads",on:true},
  {l:"Reponses automatiques",s:"Inbox pilotee par l'agent",on:true},
  {l:"Relances automatiques",s:"J+3, J+7 selon le statut",on:false},
  {l:"Routage CEO actif",s:"Delegation intelligente des taches",on:true},
  {l:"Notifications email",s:"Alertes sur leads qualifies",on:true},
];
const tones=["Professionnel & direct — Recommande pour B2B SaaS","Chaleureux & consultif — Bon pour les services","Assertif & oriente ROI — Pour les equipes sales agressives"];
const ceoRulesDefault=["Lead score > 70 → Closing agent","Message entrant non qualifie → Repondeur","Ticket priorite haute → Support immediat","Score < 30 et pas de reponse > 7j → marquer perdu"];
const titles={
  dashboard:['Dashboard',"Vue d'ensemble — Aujourd'hui"],
  leads:['Base de Leads','Statuts : Nouveau → Contacte → Repondu → Qualifie → Client'],
  conversations:['Inbox Conversations','18 conversations actives'],
  closing:['Pipeline de Closing','7 opportunites en cours'],
  support:['Support Tickets','Tri automatique par priorite — SLA actif'],
  agents:['Supervision CEO','Orchestration en temps reel'],
  billing:['Abonnement & Billing','Stripe — 99 EUR/mois'],
  settings:['Parametres','Workspace Acme SAS'],
  marketplace:['Marketplace Agents AI','5 agents actifs — 100% automatise'],
  offre:['Offre & Essai Gratuit','Parcours client + Gumroad + Stripe trial'],
  architecture:['Architecture Technique','Schemas, scripts, checklist, budget'],
};
const bgc=['#e0f2fe','#dcfce7','#fef3c7','#f5f3ff','#fee2e2','#e0f2fe','#f0fdf4','#fef9c3','#fdf2f8','#ecfdf5'];
const tc=['#0369a1','#166534','#92400e','#5b21b6','#991b1b','#0369a1','#166534','#a16207','#9d174d','#065f46'];
const SM={new:'badge-new',contacted:'badge-contacted',replied:'badge-replied',qualified:'badge-qualified',client:'badge-client',lost:'badge-lost'};
const SL={new:'Nouveau',contacted:'Contacte',replied:'Repondu',qualified:'Qualifie',client:'Client',lost:'Perdu'};
const SC={linkedin:'badge-linkedin',website:'badge-website',manual:'badge-manual'};
const PM={high:'badge-high',med:'badge-med',low:'badge-low'};
const PS={open:'badge-open',progress:'badge-progress',resolved:'badge-resolved'};
const PL={high:'Haute',med:'Moyenne',low:'Faible'};
const SLS={open:'Ouvert',progress:'En cours',resolved:'Resolu'};
const DM={active:'dot-active',running:'dot-active',busy:'dot-busy',idle:'dot-idle'};
const STL={active:'Actif',running:'En cours',busy:'Occupe',idle:'Veille'};
const LOG_DOT={success:'log-dot-success',error:'log-dot-error',warn:'log-dot-warn',info:'log-dot-info'};
const LOG_BADGE={
  success:'<span style="font-size:10px;background:#dcfce7;color:#166534;padding:1px 6px;border-radius:4px;font-weight:600;">ok</span>',
  error:'<span style="font-size:10px;background:#fee2e2;color:#991b1b;padding:1px 6px;border-radius:4px;font-weight:600;">echec</span>',
  warn:'<span style="font-size:10px;background:#fef3c7;color:#92400e;padding:1px 6px;border-radius:4px;font-weight:600;">alerte</span>',
  info:'<span style="font-size:10px;background:#eef0fd;color:#4361ee;padding:1px 6px;border-radius:4px;font-weight:600;">info</span>',
};
const mktAgents=[
  {name:"Agent CEO",icon:"🧠",color:"#f5f3ff",iconBg:"#ede9fe",role:"Superviseur & Orchestrateur",desc:"Analyse chaque lead en temps reel, applique les regles de delegation et route vers le bon agent selon le score et le contexte.",kpis:["142 actions/mois","Routage temps reel","Zero intervention manuelle"],status:"active"},
  {name:"Agent Prospecteur",icon:"🔍",color:"#e0f2fe",iconBg:"#bae6fd",role:"Recherche & Enrichissement",desc:"Trouve jusqu'a 50 leads/jour sur LinkedIn via Apollo.io, enrichit les emails et stocke tout dans Firestore automatiquement.",kpis:["50 leads/jour","Enrichissement email","Anti-ban intégre"],status:"active"},
  {name:"Agent Repondeur",icon:"💬",color:"#dcfce7",iconBg:"#bbf7d0",role:"Inbox & Relances",desc:"Gere les messages entrants, genere des reponses contextuelles via Claude API, programme les relances J+3 et J+7.",kpis:["213 actions/mois","Relances J+3, J+7","Templates personnalises"],status:"busy"},
  {name:"Agent Closing",icon:"🎯",color:"#fef3c7",iconBg:"#fde68a",role:"Conversion & Facturation",desc:"Detecte les leads chauds (score > 70), envoie le lien Calendly, cree la session Stripe Checkout apres confirmation RDV.",kpis:["64 actions/mois","Calendly automatique","Stripe Checkout"],status:"active"},
  {name:"Agent Support",icon:"🛟",color:"#fee2e2",iconBg:"#fecaca",role:"Tickets & SAV",desc:"Trie les tickets par priorite (Urgent en tete), gere les SLA, envoie les reponses via SendGrid et escalade si necessaire.",kpis:["31 actions/mois","SLA 4h/12h/48h","Escalade auto"],status:"idle"},
];
const budgetItems=[
  {label:"AWS Lambda",cost:"~8 USD",note:"1M invocations/mois incluses — gratuit sous ce seuil"},
  {label:"Apollo.io (leads)",cost:"49 USD",note:"Plan Basic — 50 exports/mois"},
  {label:"Claude API (agents)",cost:"~30 USD",note:"Sonnet 4.6 — prompts courts = ~10k tokens/jour"},
  {label:"Firebase (Spark)",cost:"0 USD",note:"Gratuit jusqu'a 50k lectures/jour"},
  {label:"SendGrid (emails)",cost:"0 USD",note:"100 emails/jour gratuits"},
  {label:"LinkedIn Ads",cost:"350 USD",note:"50 USD/j x 7 jours — test initial"},
];
const checklistItems=[
  {text:"Creer le projet Firebase",sub:"Firestore + Auth + Service Account JSON",tag:"Firebase",tagClass:"ctag-amber"},
  {text:"Configurer Stripe",sub:"Price 99 EUR/mois, trial_period_days=7",tag:"Stripe",tagClass:"ctag-blue"},
  {text:"Enregistrer les 4 webhooks Stripe",sub:"subscription.created / payment_succeeded / failed / deleted",tag:"Stripe",tagClass:"ctag-blue"},
  {text:"Deployer les scripts sur AWS Lambda",sub:"Prospecteur cron 9h-12h / Closing cron toutes les 2h",tag:"AWS",tagClass:"ctag-amber"},
  {text:"Configurer les variables .env",sub:"APOLLO_API_KEY, STRIPE_SECRET_KEY, SENDGRID_API_KEY...",tag:"Config",tagClass:"ctag-purple"},
  {text:"Deployer le dashboard sur Vercel",sub:"Import Git + env variables Firebase + Stripe",tag:"Deploy",tagClass:"ctag-green"},
  {text:"Tester le funnel en mode sandbox",sub:"Carte test Stripe 4242 4242 4242 4242",tag:"Test",tagClass:"ctag-green"},
  {text:"Lancer LinkedIn Ads 50 EUR/jour",sub:"Apres validation sur 10 leads manuels uniquement",tag:"LinkedIn",tagClass:"ctag-blue"},
  {text:"Creer l'offre sur Gumroad",sub:"New Product → Subscription → 99 USD/mois, coller le template landing_page.html",tag:"Gumroad",tagClass:"ctag-purple"},
  {text:"Tester l'essai gratuit end-to-end",sub:"Creer un compte test, verifier trial Stripe, verifier Firestore subscriptions/{wid}.status = trialing",tag:"Test",tagClass:"ctag-green"},
  {text:"Configurer le script stripe_trial.py",sub:"Remplacer VOTRE_PRICE_ID_99EUR par le Price ID reel depuis Stripe Dashboard",tag:"Stripe",tagClass:"ctag-blue"},
  {text:"Envoyer email de bienvenue post-inscription",sub:"SendGrid template : confirmer l'essai, expliquer les 5 agents, lien dashboard",tag:"Email",tagClass:"ctag-amber"},
];
const scriptItems=[
  {name:"agent_prospecteur.py",desc:"Trouve des leads Apollo + stocke Firestore",lang:"Python",code:`# Deployer sur AWS Lambda — cron 9h-12h lun-ven
import requests, time, random, firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime

# Init Firebase
cred = credentials.Certificate("firebase-service-account.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

def search_leads(api_key, title, limit=25):
    url = "https://api.apollo.io/v1/mixed_people/search"
    resp = requests.post(url, json={
        "api_key": api_key, "q_keywords": title,
        "page": 1, "per_page": limit
    })
    return resp.json().get("people", [])

def store_lead(lead, workspace_id):
    lead_id = lead.get("id", "")
    if not lead_id: return False
    # Evite les doublons
    if db.collection("leads").document(lead_id).get().exists:
        return False
    score = 40
    if lead.get("email"): score += 20
    if "CEO" in lead.get("title",""): score += 20
    if "Founder" in lead.get("title",""): score += 15
    db.collection("leads").document(lead_id).set({
        "full_name": f"{lead.get('first_name','')} {lead.get('last_name','')}",
        "company": lead.get("organization",{}).get("name",""),
        "job_title": lead.get("title",""),
        "email": lead.get("email",""),
        "source": "linkedin", "status": "new",
        "score": min(score, 100),
        "workspace_id": workspace_id,
        "created_at": datetime.now().isoformat()
    })
    return True

def run():
    API_KEY = "VOTRE_CLE_APOLLO"
    WID = "VOTRE_WORKSPACE_ID"
    targets = ["CMO","VP Sales","Founder SaaS"]
    for title in targets:
        for lead in search_leads(API_KEY, title):
            if store_lead(lead, WID):
                print(f"+ {lead.get('first_name')} stocke")
                time.sleep(random.randint(30, 90))

if __name__ == "__main__": run()`},
  {name:"agent_closing.py",desc:"Detecte leads chauds + envoie Calendly + cree Stripe Checkout",lang:"Python",code:`# Deployer sur AWS Lambda — cron toutes les 2h
import os, requests, stripe, firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime

if not firebase_admin._apps:
    cred = credentials.Certificate("firebase-service-account.json")
    firebase_admin.initialize_app(cred)
db = firestore.client()
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

def get_hot_leads(workspace_id):
    return [
        doc.to_dict() | {"id": doc.id}
        for doc in db.collection("leads")
            .where("workspace_id","==", workspace_id)
            .where("status","==","replied")
            .where("score",">=",70).stream()
    ]

def send_calendly(lead):
    url = "https://api.sendgrid.com/v3/mail/send"
    headers = {"Authorization": f"Bearer {os.getenv('SENDGRID_API_KEY')}"}
    resp = requests.post(url, headers=headers, json={
        "personalizations": [{"to":[{"email":lead["email"]}]}],
        "from": {"email":"hello@acme.fr"},
        "content": [{"type":"text/plain","value":
            f"Bonjour {lead['full_name'].split()[0]},\n\n"
            f"Suite a nos echanges, voici mon lien pour un creneau :\n"
            f"{os.getenv('CALENDLY_LINK')}\n\nA bientot"
        }]
    })
    return resp.status_code == 202

def create_checkout(lead):
    session = stripe.checkout.Session.create(
        payment_method_types=["card"],
        line_items=[{"price": os.getenv("STRIPE_PRICE_ID"), "quantity":1}],
        mode="subscription", trial_period_days=7,
        customer_email=lead["email"],
        success_url="https://leadflowai.com/success",
        cancel_url="https://leadflowai.com/cancel",
        metadata={"lead_id": lead["id"]}
    )
    return session.url

def run():
    WID = os.getenv("WORKSPACE_ID")
    for lead in get_hot_leads(WID):
        if send_calendly(lead):
            db.collection("leads").document(lead["id"]).update({
                "status":"qualified",
                "stripe_checkout": create_checkout(lead)
            })
            print(f"+ Calendly + Stripe envoyes a {lead['full_name']}")

if __name__ == "__main__": run()`},
  {name:"stripe_webhooks.py",desc:"FastAPI — ecoute les evenements Stripe et met a jour Firebase",lang:"Python/FastAPI",code:`# Deployer sur Railway.app ou Render.com
# URL a enregistrer dans Stripe Dashboard > Webhooks
from fastapi import FastAPI, Request, HTTPException
import stripe, os
import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime

app = FastAPI()
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
WEBHOOK_SECRET = os.getenv("STRIPE_WEBHOOK_SECRET")

if not firebase_admin._apps:
    firebase_admin.initialize_app(
        credentials.Certificate("firebase-service-account.json"))
db = firestore.client()

@app.post("/webhooks/stripe")
async def webhook(request: Request):
    payload = await request.body()
    sig = request.headers.get("stripe-signature")
    try:
        event = stripe.Webhook.construct_event(
            payload, sig, WEBHOOK_SECRET)
    except Exception:
        raise HTTPException(status_code=400)

    data = event["data"]["object"]
    etype = event["type"]
    wid = data.get("metadata",{}).get("workspace_id")

    status_map = {
        "customer.subscription.created": "trialing",
        "invoice.payment_succeeded": "active",
        "invoice.payment_failed": "past_due",
        "customer.subscription.deleted": "canceled",
    }
    if etype in status_map and wid:
        db.collection("subscriptions").document(wid).set({
            "status": status_map[etype],
            "stripe_subscription_id": data.get("id",""),
            "updated_at": datetime.now().isoformat()
        }, merge=True)

    return {"status": "ok"}

# Webhooks a enregistrer dans Stripe :
# customer.subscription.created -> essai demarre
# invoice.payment_succeeded      -> paiement ok
# invoice.payment_failed         -> paiement echoue
# customer.subscription.deleted -> resiliation`},
  {name:"stripe_trial.py",desc:"Cree un client avec essai gratuit 7j + abonnement 99 EUR/mois",lang:"Python",code:`# stripe_trial.py — Gestion de l'essai gratuit et de l'abonnement
# Utilise dans : page inscription, webhook new user
import stripe
from datetime import datetime, timedelta

stripe.api_key = "VOTRE_CLE_STRIPE_SECRET"

def create_trial_subscription(email: str, name: str) -> dict:
    """Cree un client Stripe avec essai gratuit de 7 jours.
    Aucune carte requise pendant l'essai.
    Passage automatique a 99 EUR/mois apres 7 jours."""
    
    trial_end = int((datetime.now() + timedelta(days=7)).timestamp())
    
    # Cree le client
    customer = stripe.Customer.create(
        email=email,
        name=name,
        metadata={"source": "leadflowai_signup"}
    )
    
    # Cree l'abonnement avec essai
    subscription = stripe.Subscription.create(
        customer=customer.id,
        items=[{
            "price": "VOTRE_PRICE_ID_99EUR",  # price_xxxxx depuis Stripe Dashboard
        }],
        trial_end=trial_end,
        payment_behavior="default_incomplete",  # Pas de CB requise pendant l'essai
        expand=["latest_invoice.payment_intent"],
    )
    
    return {
        "customer_id": customer.id,
        "subscription_id": subscription.id,
        "trial_end": datetime.fromtimestamp(subscription.trial_end).isoformat(),
        "status": subscription.status  # "trialing"
    }

def cancel_subscription(subscription_id: str) -> bool:
    """Annulation immediate ou en fin de periode."""
    stripe.Subscription.modify(
        subscription_id,
        cancel_at_period_end=True  # Annule proprement en fin de mois
    )
    return True

def get_trial_days_remaining(subscription_id: str) -> int:
    """Retourne le nombre de jours restants dans l'essai."""
    sub = stripe.Subscription.retrieve(subscription_id)
    if sub.status != "trialing" or not sub.trial_end:
        return 0
    remaining = (datetime.fromtimestamp(sub.trial_end) - datetime.now()).days
    return max(0, remaining)

# Exemple d'utilisation :
if __name__ == "__main__":
    result = create_trial_subscription("client@example.com", "Jean Dupont")
    print(f"Essai demarre ! Fin : {result['trial_end']}")
    print(f"Subscription ID : {result['subscription_id']}")`},
  {name:"gumroad_landing.html",desc:"Page de vente optimisee — a coller dans Gumroad ou Vercel",lang:"HTML",code:`<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LeadFlowai Pro — Prospection automatique 24/7</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, 'Segoe UI', sans-serif; background: #f8fafc; color: #0f172a; }
    .hero {
      background: linear-gradient(135deg, #0d1421 0%, #1e3a5f 100%);
      color: white; padding: 80px 24px; text-align: center;
    }
    .hero h1 { font-size: clamp(26px, 5vw, 46px); font-weight: 800;
      letter-spacing: -0.03em; line-height: 1.1; margin-bottom: 18px; }
    .hero h1 span { color: #4361ee; }
    .hero p { font-size: 17px; color: rgba(255,255,255,0.6);
      max-width: 520px; margin: 0 auto 28px; line-height: 1.7; }
    .cta-primary { display: inline-block; background: #4361ee; color: white;
      padding: 15px 36px; border-radius: 10px; font-weight: 700; font-size: 16px;
      text-decoration: none; transition: opacity .15s; }
    .cta-primary:hover { opacity: 0.9; }
    .trial-note { font-size: 12px; color: rgba(255,255,255,0.35); margin-top: 10px; }
    .pricing-section { max-width: 420px; margin: 60px auto; padding: 0 16px; }
    .pricing-card { background: white; border: 0.5px solid #e2e8f0;
      border-radius: 16px; padding: 32px; text-align: center;
      box-shadow: 0 4px 24px rgba(0,0,0,0.06); }
    .price-label { font-size: 12px; font-weight: 600; text-transform: uppercase;
      letter-spacing: 0.06em; color: #4361ee; margin-bottom: 10px; }
    .price-val { font-size: 48px; font-weight: 800; letter-spacing: -0.03em; }
    .price-val span { font-size: 18px; font-weight: 400; color: #64748b; }
    .trial-badge { display: inline-block; background: #dcfce7; color: #166534;
      border-radius: 99px; padding: 6px 16px; font-size: 13px; font-weight: 600;
      margin: 14px 0; }
    .feature-list { text-align: left; margin: 18px 0; }
    .feature-item { display: flex; align-items: center; gap: 10px;
      padding: 8px 0; font-size: 14px; border-bottom: 0.5px solid #f1f5f9; }
    .feature-item:last-child { border-bottom: none; }
    .feature-icon { color: #16a34a; font-weight: 700; flex-shrink: 0; }
    .agents-section { max-width: 900px; margin: 0 auto; padding: 40px 16px 60px; }
    .agents-section h2 { text-align: center; font-size: 22px; font-weight: 700;
      margin-bottom: 24px; letter-spacing: -0.01em; }
    .agents-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 14px; }
    .agent-card { background: white; border: 0.5px solid #e2e8f0; border-radius: 12px;
      padding: 18px; text-align: center; }
    .agent-icon { font-size: 24px; margin-bottom: 8px; }
    .agent-name { font-size: 13px; font-weight: 600; margin-bottom: 4px; }
    .agent-desc { font-size: 12px; color: #64748b; line-height: 1.5; }
  </style>
</head>
<body>
  <div class="hero">
    <h1>Votre equipe commerciale<br><span>entierement automatisee.</span></h1>
    <p>5 agents IA s'occupent de tout : prospection LinkedIn, reponses, closing, support. Vous recoltez les rendez-vous.</p>
    <a href="https://checkout.stripe.com/VOTRE_LIEN_CHECKOUT" class="cta-primary">
      Demarrer l'essai gratuit — 7 jours
    </a>
    <p class="trial-note">Aucune carte bancaire requise. Annulation en 1 clic.</p>
  </div>

  <div class="pricing-section">
    <div class="pricing-card">
      <div class="price-label">Offre unique</div>
      <div class="price-val">99 <span>EUR / mois</span></div>
      <div class="trial-badge">7 jours gratuits inclus</div>
      <div class="feature-list">
        <div class="feature-item"><span class="feature-icon">ok</span>5 agents IA actifs</div>
        <div class="feature-item"><span class="feature-icon">ok</span>50 leads LinkedIn/jour</div>
        <div class="feature-item"><span class="feature-icon">ok</span>Calendly + Stripe inclus</div>
        <div class="feature-item"><span class="feature-icon">ok</span>Dashboard temps reel</div>
        <div class="feature-item"><span class="feature-icon">ok</span>Annulable a tout moment</div>
      </div>
      <a href="https://checkout.stripe.com/VOTRE_LIEN_CHECKOUT"
        style="display:block;background:#4361ee;color:white;padding:14px;border-radius:10px;
        font-weight:700;font-size:15px;text-decoration:none;margin-top:8px;">
        Commencer maintenant
      </a>
    </div>
  </div>

  <div class="agents-section">
    <h2>Comment ca marche ?</h2>
    <div class="agents-grid">
      <div class="agent-card">
        <div class="agent-icon">🧠</div>
        <div class="agent-name">Agent CEO</div>
        <div class="agent-desc">Orchestre et delegue aux bons agents en temps reel.</div>
      </div>
      <div class="agent-card">
        <div class="agent-icon">🔍</div>
        <div class="agent-name">Prospecteur</div>
        <div class="agent-desc">50 leads LinkedIn par jour, enrichis et qualifies.</div>
      </div>
      <div class="agent-card">
        <div class="agent-icon">💬</div>
        <div class="agent-name">Repondeur</div>
        <div class="agent-desc">Reponses automatiques + relances J+3 et J+7.</div>
      </div>
      <div class="agent-card">
        <div class="agent-icon">🎯</div>
        <div class="agent-name">Closing</div>
        <div class="agent-desc">Calendly + Stripe Checkout declenches auto.</div>
      </div>
      <div class="agent-card">
        <div class="agent-icon">🛟</div>
        <div class="agent-name">Support</div>
        <div class="agent-desc">Tickets tries par SLA, FAQ automatique.</div>
      </div>
    </div>
  </div>
</body>
</html>`},
];
let currentScript='';

/* ── UTILS ─────────────────────────────────────────────── */
const ini=n=>n.split(' ').map(x=>x[0]).join('').toUpperCase();
const now=()=>{const d=new Date();return`${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;};

function toast(msg,type='success'){
  const c=document.getElementById('toast-container');
  const el=document.createElement('div');
  el.className=`toast toast-${type}`;
  el.innerHTML=`<div class="toast-icon">${{success:'ok',info:'i',warn:'!'}[type]}</div>${msg}`;
  c.appendChild(el);
  requestAnimationFrame(()=>requestAnimationFrame(()=>el.classList.add('show')));
  setTimeout(()=>{el.classList.remove('show');setTimeout(()=>el.remove(),280);},3000);
}
function withLoader(btn,label,ms=900){
  const orig=btn.innerHTML;btn.classList.add('loading');
  btn.innerHTML=`<span class="spinner"></span>${label}`;
  return new Promise(r=>setTimeout(()=>{btn.classList.remove('loading');btn.innerHTML=orig;r();},ms));
}
function openModal(id){document.getElementById(id).classList.add('open');}
function closeModal(id){document.getElementById(id).classList.remove('open');}
function closeOnOverlay(e,id){if(e.target===document.getElementById(id))closeModal(id);}

/* ── NAV ───────────────────────────────────────────────── */
function switchView(v,btn){
  document.querySelectorAll('.view').forEach(el=>el.classList.remove('active'));
  document.getElementById('view-'+v).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  const[t,s]=titles[v];
  document.getElementById('page-title').textContent=t;
  document.getElementById('page-sub').textContent=s;
}

/* ── LEADS ─────────────────────────────────────────────── */
function renderLeads(data){
  const tb=document.getElementById('leads-table');
  const em=document.getElementById('leads-empty');
  if(!data.length){tb.innerHTML='';em.style.display='block';return;}
  em.style.display='none';
  tb.innerHTML=data.map((l)=>{
    const gi=leads.indexOf(l);
    return `<tr id="lr-${l.id}">
      <td><div style="display:flex;align-items:center;gap:9px;">
        <div style="width:30px;height:30px;border-radius:50%;background:${bgc[gi%bgc.length]};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;color:${tc[gi%tc.length]};flex-shrink:0;">${ini(l.name)}</div>
        <div><div style="font-size:13px;font-weight:500;">${l.name}</div><div style="font-size:11px;color:var(--text-secondary);">${l.role}</div></div>
      </div></td>
      <td>${l.company}</td>
      <td><span class="badge ${SC[l.source]}">${l.source}</span></td>
      <td><span class="badge ${SM[l.status]}" id="ls-${l.id}">${SL[l.status]}</span></td>
      <td><div style="display:flex;align-items:center;gap:7px;"><div class="score-bar"><div class="score-fill" style="width:${l.score}%;"></div></div><span style="font-size:12px;color:var(--text-secondary);">${l.score}</span></div></td>
      <td style="font-size:12px;color:var(--text-secondary);" id="lc-${l.id}">${l.lastContact}</td>
      <td><div style="display:flex;gap:6px;">
        <button class="btn-ghost" style="font-size:11px;padding:4px 9px;" onclick="viewLead(${l.id})">Voir</button>
        <button class="btn-primary" style="font-size:11px;padding:4px 9px;" id="lb-${l.id}" onclick="contactLead(${l.id},this)">${l.status==='client'?'Message':l.status==='contacted'||l.status==='replied'?'Relancer':'Contacter'}</button>
      </div></td>
    </tr>`;
  }).join('');
}
function filterLeads(){
  const q=document.getElementById('lead-search').value.toLowerCase();
  const f=document.getElementById('lead-filter').value;
  renderLeads(leads.filter(l=>(!q||l.name.toLowerCase().includes(q)||l.company.toLowerCase().includes(q))&&(!f||l.status===f)));
}
function contactLead(id,btn){
  const l=leads.find(x=>x.id===id);if(!l)return;
  withLoader(btn,'Envoi...',750).then(()=>{
    if(l.status==='new')l.status='contacted';
    else if(l.status==='contacted')l.status='replied';
    else if(l.status==='replied')l.status='qualified';
    else if(l.status==='qualified')l.status='client';
    const b=document.getElementById('ls-'+id);
    if(b){b.className='badge '+SM[l.status];b.textContent=SL[l.status];}
    const ct=document.getElementById('lc-'+id);if(ct)ct.textContent="a l'instant";
    l.lastContact="a l'instant";
    btn.textContent=l.status==='client'?'Message':l.status==='contacted'||l.status==='replied'?'Relancer':'Contacter';
    const row=document.getElementById('lr-'+id);
    if(row){row.style.background='#eef0fd';setTimeout(()=>row.style.background='',1200);}
    toast(`Message envoye a ${l.name}`,'success');
  });
}
function viewLead(id){
  const l=leads.find(x=>x.id===id);if(!l)return;
  const gi=leads.indexOf(l);
  document.getElementById('detail-title').textContent='Fiche — '+l.name;
  document.getElementById('detail-body').innerHTML=`
    <div style="display:flex;align-items:center;gap:14px;margin-bottom:20px;">
      <div style="width:48px;height:48px;border-radius:50%;background:${bgc[gi%bgc.length]};display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:${tc[gi%tc.length]};">${ini(l.name)}</div>
      <div><div style="font-size:15px;font-weight:600;">${l.name}</div><div style="font-size:13px;color:var(--text-secondary);">${l.role} chez ${l.company}</div></div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:13px;">
      <div style="background:var(--bg-secondary);border-radius:8px;padding:12px;"><div style="font-size:11px;color:var(--text-secondary);margin-bottom:4px;">Source</div><span class="badge ${SC[l.source]}">${l.source}</span></div>
      <div style="background:var(--bg-secondary);border-radius:8px;padding:12px;"><div style="font-size:11px;color:var(--text-secondary);margin-bottom:4px;">Statut</div><span class="badge ${SM[l.status]}">${SL[l.status]}</span></div>
      <div style="background:var(--bg-secondary);border-radius:8px;padding:12px;"><div style="font-size:11px;color:var(--text-secondary);margin-bottom:4px;">Score IA</div><div style="font-weight:600;color:#4361ee;font-size:16px;">${l.score}/100</div></div>
      <div style="background:var(--bg-secondary);border-radius:8px;padding:12px;"><div style="font-size:11px;color:var(--text-secondary);margin-bottom:4px;">Dernier contact</div><div style="font-weight:500;">${l.lastContact}</div></div>
    </div>`;
  document.getElementById('modal-lead-detail').dataset.lid=id;
  openModal('modal-lead-detail');
}
function contactFromDetail(btn){
  const id=parseInt(document.getElementById('modal-lead-detail').dataset.lid);
  withLoader(btn,'Envoi...',800).then(()=>{
    const l=leads.find(x=>x.id===id);
    if(l&&l.status==='new')l.status='contacted';
    closeModal('modal-lead-detail');filterLeads();
    toast(`${l?l.name:'Lead'} contacte avec succes`,'success');
  });
}
function submitAddLead(btn){
  const name=document.getElementById('nl-name').value.trim();
  const co=document.getElementById('nl-company').value.trim();
  const role=document.getElementById('nl-role').value.trim();
  const src=document.getElementById('nl-source').value;
  const st=document.getElementById('nl-status').value;
  if(!name||!co){toast('Nom et entreprise requis','warn');return;}
  withLoader(btn,'Ajout...',650).then(()=>{
    leads.unshift({id:nextLid++,name,company:co,role:role||'Contact',source:src,status:st,score:Math.floor(Math.random()*40)+30,lastContact:"a l'instant"});
    closeModal('modal-add-lead');
    ['nl-name','nl-company','nl-role'].forEach(x=>document.getElementById(x).value='');
    filterLeads();updateKPIs();
    toast(`Lead "${name}" ajoute`,'success');
  });
}

/* ── CONVERSATIONS ─────────────────────────────────────── */
function renderConvList(){
  document.getElementById('conv-list').innerHTML=conversations.map(c=>`
    <div class="inbox-item ${c.id===activeConv?'active-conv':''}" onclick="selectConv(${c.id})">
      <div class="avatar" style="background:${c.id===activeConv?'#eef0fd':'#f8fafc'};color:${c.id===activeConv?'#4361ee':'#64748b'};">${ini(c.name)}</div>
      <div style="flex:1;min-width:0;">
        <div style="display:flex;justify-content:space-between;">
          <span style="font-size:13px;font-weight:${c.unread?600:400};">${c.name}</span>
          <span style="font-size:11px;color:var(--text-secondary);">${c.time}</span>
        </div>
        <div style="font-size:12px;color:var(--text-secondary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${c.preview}</div>
      </div>
      ${c.unread?`<div style="width:7px;height:7px;border-radius:50%;background:#4361ee;flex-shrink:0;margin-top:5px;"></div>`:''}
    </div>`).join('');
}
function renderThread(){
  const c=conversations.find(x=>x.id===activeConv);if(!c)return;
  document.getElementById('conv-name').textContent=c.name;
  document.getElementById('conv-company').textContent=c.company;
  const qb=document.getElementById('qualify-btn');
  if(qb){qb.textContent=c.qualified?'Qualifie':'Qualifier';qb.style.background=c.qualified?'#16a34a':'#4361ee';}
  const thread=document.getElementById('message-thread');
  const msgs=messages.filter(m=>m.cid===activeConv);
  thread.innerHTML=msgs.map(m=>`
    <div class="msg-bubble ${m.from==='lead'?'msg-in':'msg-out'}">${m.text}</div>
    <div class="${m.from==='lead'?'msg-time':'msg-time-out'}">${m.from==='lead'?c.name.split(' ')[0]+' — ':' Agent Repondeur — '}${m.t}</div>
  `).join('');
  if(!c.qualified){thread.innerHTML+=`<div style="padding:10px 14px;background:#eef0fd;border-radius:8px;font-size:12px;color:#4361ee;margin-top:8px;">Suggestion IA — Proposer un RDV Calendly pour approfondir la demo Closing</div>`;}
  thread.scrollTop=thread.scrollHeight;
}
function selectConv(id){
  activeConv=id;const c=conversations.find(x=>x.id===id);if(c)c.unread=false;
  updateUnreadBadge();renderConvList();renderThread();
}
function sendMessage(){
  const input=document.getElementById('reply-input');
  const text=input.value.trim();if(!text)return;
  messages.push({cid:activeConv,from:'agent',text,t:now()});
  const c=conversations.find(x=>x.id===activeConv);
  if(c)c.preview=text.slice(0,42)+(text.length>42?'...':'');
  input.value='';renderThread();renderConvList();toast('Message envoye','success');
  setTimeout(()=>{
    const replies=["Merci, je reviens vers vous tres rapidement.","Interessant — pouvez-vous m'envoyer plus d'infos ?","Ok, je transmets a mon equipe.","Parfait, on peut convenir d'un appel ?"];
    const reply=replies[Math.floor(Math.random()*replies.length)];
    messages.push({cid:activeConv,from:'lead',text:reply,t:now()});
    const c2=conversations.find(x=>x.id===activeConv);
    if(c2){c2.preview=reply.slice(0,42);c2.unread=true;}
    renderThread();renderConvList();updateUnreadBadge();
    if(c2)toast(`Reponse de ${c2.name}`,'info');
  },2200);
}
function qualifyConv(btn){
  const c=conversations.find(x=>x.id===activeConv);if(!c)return;
  if(c.qualified){toast('Deja qualifie','info');return;}
  withLoader(btn,'...',600).then(()=>{c.qualified=true;btn.textContent='Qualifie';btn.style.background='#16a34a';toast(`${c.name} qualifie — route vers Closing`,'success');renderThread();});
}
function markAllRead(btn){
  withLoader(btn,'...',450).then(()=>{conversations.forEach(c=>c.unread=false);renderConvList();updateUnreadBadge();toast('Toutes les conversations lues','success');});
}
function updateUnreadBadge(){
  document.getElementById('badge-unread').textContent=conversations.filter(c=>c.unread).length;
}
function confirmCalendly(btn){
  withLoader(btn,'Envoi...',800).then(()=>{closeModal('modal-calendly');toast("Lien Calendly envoye par l'agent Closing",'success');});
}

/* ── KANBAN ────────────────────────────────────────────── */
function renderKanban(){
  document.getElementById('kanban-board').innerHTML=kanban.map((col,ci)=>`
    <div class="kanban-col">
      <div class="kanban-title">
        <span style="display:flex;align-items:center;gap:7px;"><span style="width:8px;height:8px;border-radius:50%;background:${col.color};display:inline-block;"></span>${col.col}</span>
        <span style="background:#fff;border:0.5px solid var(--border);border-radius:99px;padding:1px 7px;font-size:11px;">${col.cards.length}</span>
      </div>
      ${col.cards.map((c,li)=>`
        <div class="kanban-card" onclick="promoteCard(${ci},${li},this)">
          <div style="font-size:13px;font-weight:500;">${c.name}</div>
          <div style="font-size:11px;color:var(--text-secondary);margin-top:3px;">${c.co}</div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-top:8px;">
            <div style="display:flex;align-items:center;gap:5px;"><div class="score-bar" style="width:36px;"><div class="score-fill" style="width:${c.score}%;"></div></div><span style="font-size:11px;color:var(--text-secondary);">${c.score}</span></div>
            <span style="font-size:10px;color:#4361ee;">${ci<kanban.length-1?'Avancer →':'Gagne'}</span>
          </div>
        </div>`).join('')}
    </div>`).join('');
}
function promoteCard(ci,li,card){
  if(ci>=kanban.length-1){toast('Opportunite deja gagnee','info');return;}
  card.style.opacity='0.4';card.style.transform='scale(0.95)';
  setTimeout(()=>{const c=kanban[ci].cards.splice(li,1)[0];kanban[ci+1].cards.unshift(c);renderKanban();toast(`${c.name} avance vers "${kanban[ci+1].col}"`,'success');},300);
}
function submitAddOpp(btn){
  const name=document.getElementById('op-name').value.trim();
  const co=document.getElementById('op-company').value.trim();
  const stage=parseInt(document.getElementById('op-stage').value);
  if(!name||!co){toast('Nom et entreprise requis','warn');return;}
  withLoader(btn,'Creation...',650).then(()=>{
    kanban[stage].cards.unshift({name,co,score:Math.floor(Math.random()*30)+40});
    closeModal('modal-opp');['op-name','op-company'].forEach(x=>document.getElementById(x).value='');
    renderKanban();toast(`Opportunite "${name}" ajoutee`,'success');
  });
}

/* ── TICKETS — tri par priorite + SLA ─────────────────── */
function renderTickets(){
  const prioOrder={high:0,med:1,low:2};
  const sorted=[...tickets].sort((a,b)=>{
    if(a.status==='resolved'&&b.status!=='resolved')return 1;
    if(b.status==='resolved'&&a.status!=='resolved')return -1;
    return prioOrder[a.priority]-prioOrder[b.priority];
  });
  const open=sorted.filter(t=>t.status!=='resolved').length;
  document.getElementById('badge-tickets').textContent=open;
  document.getElementById('kpi-tickets').textContent=open;
  document.getElementById('tickets-table').innerHTML=sorted.map(tk=>{
    const slaClass=tk.priority==='high'?'sla-urgent':tk.priority==='med'?'sla-med':'sla-ok';
    const slaText=tk.status==='resolved'?'—':tk.sla;
    return `<tr id="tr-${tk.id}" ${tk.status==='resolved'?'style="opacity:0.5"':''}>
      <td style="padding:0;width:4px;"><div class="pbar pbar-${tk.priority}" style="margin:0;"></div></td>
      <td style="font-size:12px;color:var(--text-secondary);font-family:monospace;">#${tk.id}</td>
      <td>${tk.subject}</td>
      <td style="color:var(--text-secondary);">${tk.contact}</td>
      <td><span class="badge ${PM[tk.priority]}">${PL[tk.priority]}</span></td>
      <td><span class="badge ${PS[tk.status]}">${SLS[tk.status]}</span></td>
      <td class="${slaClass}">${slaText}</td>
      <td>${tk.status!=='resolved'?`<button class="btn-ghost" style="font-size:11px;padding:4px 9px;" onclick="openTicket(${tk.id})">Ouvrir</button>`:`<span style="font-size:11px;color:var(--text-secondary);">Resolu</span>`}</td>
    </tr>`;
  }).join('');
}
function openTicket(id){
  currentTid=id;const tk=tickets.find(t=>t.id===id);if(!tk)return;
  document.getElementById('tk-modal-title').textContent=`Ticket #${tk.id}`;
  document.getElementById('tk-modal-body').innerHTML=`
    <div style="background:var(--bg-secondary);border-radius:8px;padding:14px;">
      <div style="font-size:14px;font-weight:500;margin-bottom:10px;">${tk.subject}</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <span class="badge ${PM[tk.priority]}">${PL[tk.priority]}</span>
        <span class="badge ${PS[tk.status]}">${SLS[tk.status]}</span>
        <span style="font-size:12px;color:var(--text-secondary);">Contact : ${tk.contact}</span>
        ${tk.status!=='resolved'?`<span style="font-size:12px;font-weight:600;${tk.priority==='high'?'color:#dc2626':tk.priority==='med'?'color:#d97706':'color:#16a34a'}">SLA : ${tk.sla}</span>`:''}
      </div>
    </div>`;
  document.getElementById('tk-reply').value='';openModal('modal-ticket');
}
function sendTicketReply(btn){
  const reply=document.getElementById('tk-reply').value.trim();
  if(!reply){toast('Reponse vide','warn');return;}
  withLoader(btn,'Envoi...',750).then(()=>{
    const tk=tickets.find(t=>t.id===currentTid);if(tk)tk.status='progress';
    closeModal('modal-ticket');renderTickets();toast('Reponse envoyee au client','success');
  });
}
function resolveTicket(btn){
  withLoader(btn,'...',550).then(()=>{
    const tk=tickets.find(t=>t.id===currentTid);if(tk)tk.status='resolved';
    closeModal('modal-ticket');renderTickets();toast(`Ticket #${currentTid} marque resolu`,'success');
  });
}
function toggleNewTicketForm(){
  const f=document.getElementById('new-ticket-form');f.style.display=f.style.display==='none'?'block':'none';
}
function submitNewTicket(btn){
  const contact=document.getElementById('nt-contact').value.trim();
  const subject=document.getElementById('nt-subject').value.trim();
  const priority=document.getElementById('nt-priority').value;
  if(!contact||!subject){toast('Contact et sujet requis','warn');return;}
  withLoader(btn,'Creation...',650).then(()=>{
    const slaMap={high:'4h',med:'12h',low:'48h'};
    tickets.unshift({id:nextTid++,subject,contact,priority,status:'open',date:'Maintenant',sla:slaMap[priority]});
    document.getElementById('nt-contact').value='';document.getElementById('nt-subject').value='';
    document.getElementById('new-ticket-form').style.display='none';
    renderTickets();toast('Ticket cree et assigne au Support','success');
  });
}

/* ── LOGS avec indicateurs couleur ────────────────────── */
function logHtml(l){
  const dotClass=LOG_DOT[l.type]||'log-dot-info';
  const badge=LOG_BADGE[l.type]||'';
  return `<div class="log-row">
    <span class="agent-chip ${l.chip}">${l.agent}</span>
    <div style="flex:1;min-width:0;">
      <p style="font-size:13px;">${l.action} ${badge}</p>
      <p style="font-size:11px;color:var(--text-secondary);margin-top:3px;">${l.time}</p>
    </div>
    <div class="agent-dot ${dotClass}" style="margin-top:4px;flex-shrink:0;"></div>
  </div>`;
}

/* ── AGENTS ────────────────────────────────────────────── */
function renderAgents(){
  document.getElementById('agent-cards').innerHTML=agents.map(a=>`
    <div class="kpi-card" style="padding:14px;">
      <div style="display:flex;align-items:center;gap:7px;margin-bottom:10px;"><div class="agent-dot ${DM[a.status]}"></div><span style="font-size:13px;font-weight:600;">${a.name}</span></div>
      <div style="font-size:11px;color:var(--text-secondary);margin-bottom:10px;">${a.role}</div>
      <div style="font-size:22px;font-weight:600;">${a.actions}</div>
      <div style="font-size:11px;color:var(--text-secondary);margin-top:2px;">actions ce mois</div>
      <div style="margin-top:10px;"><span class="badge ${a.chip}">${STL[a.status]}</span></div>
    </div>`).join('');
  document.getElementById('full-log').innerHTML=logs.map(logHtml).join('');
}

/* ── BILLING ───────────────────────────────────────────── */
function renderBilling(){
  document.getElementById('features-list').innerHTML=features.map(f=>`
    <div style="display:flex;align-items:center;gap:8px;font-size:13px;padding:4px 0;">
      <div style="width:16px;height:16px;background:#dcfce7;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:9px;color:#166534;font-weight:700;">ok</div>${f}
    </div>`).join('');
}

/* ── SETTINGS ──────────────────────────────────────────── */
function renderToggles(){
  document.getElementById('agent-toggles').innerHTML=tgls.map((t,i)=>`
    <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;">
      <div><div style="font-size:13px;font-weight:500;">${t.l}</div><div style="font-size:11px;color:var(--text-secondary);">${t.s}</div></div>
      <label class="toggle"><input type="checkbox" ${t.on?'checked':''} onchange="tgls[${i}].on=this.checked;toast(tgls[${i}].l+' '+(this.checked?'active':'desactive'),'info')"><span class="slider"></span></label>
    </div>`).join('');
  document.getElementById('tone-options').innerHTML=tones.map((t,i)=>`
    <label style="display:flex;align-items:center;gap:10px;cursor:pointer;padding:8px 10px;border-radius:8px;border:0.5px solid transparent;transition:border-color .15s" onmouseover="this.style.borderColor='var(--border)'" onmouseout="this.style.borderColor='transparent'">
      <input type="radio" name="tone" ${i===0?'checked':''}/>
      <div><div style="font-size:13px;font-weight:500;">${t.split(' — ')[0]}</div><div style="font-size:12px;color:var(--text-secondary);">${t.split(' — ')[1]}</div></div>
    </label>`).join('');
  document.getElementById('ceo-rules').innerHTML=ceoRulesDefault.map(r=>`
    <div style="padding:10px 12px;background:var(--bg-secondary);border-radius:8px;display:flex;align-items:center;justify-content:space-between;">
      <span style="font-size:13px;">${r}</span>
      <button style="background:none;border:none;cursor:pointer;color:#dc2626;font-size:16px;line-height:1;padding:0 4px;" onclick="removeRule(this)">&#215;</button>
    </div>`).join('');
}
function removeRule(btn){
  btn.parentElement.style.transition='opacity .25s';btn.parentElement.style.opacity='0';
  setTimeout(()=>{btn.parentElement.remove();toast('Regle supprimee','info');},250);
}
function addCeoRule(){
  const rule=prompt('Nouvelle regle :','Ex : Score < 30 → marquer perdu');
  if(!rule||!rule.trim())return;
  const rc=document.getElementById('ceo-rules');
  const div=document.createElement('div');
  div.style.cssText='padding:10px 12px;background:var(--bg-secondary);border-radius:8px;display:flex;align-items:center;justify-content:space-between;animation:fadeIn .2s ease;';
  div.innerHTML=`<span style="font-size:13px;">${rule.trim()}</span><button style="background:none;border:none;cursor:pointer;color:#dc2626;font-size:16px;line-height:1;padding:0 4px;" onclick="removeRule(this)">&#215;</button>`;
  rc.appendChild(div);toast('Regle ajoutee','success');
}
function saveSettings(btn){
  withLoader(btn,'Sauvegarde...',950).then(()=>{
    btn.classList.add('success-state');btn.textContent='Sauvegarde !';
    toast('Parametres sauvegardes avec succes','success');
    setTimeout(()=>{btn.classList.remove('success-state');btn.textContent='Sauvegarder les changements';},2200);
  });
}

/* ── DASHBOARD ─────────────────────────────────────────── */
function renderDashLog(){
  document.getElementById('dash-log').innerHTML=logs.slice(0,5).map(logHtml).join('');
  // Funnel avec taux de conversion
  const steps=[
    {l:'Nouveau',n:47,pct:100,c:'#3b4e9e'},
    {l:'Contacte',n:31,pct:66,c:'#2d5fa3'},
    {l:'Repondu',n:18,pct:38,c:'#1e7ea8'},
    {l:'Qualifie',n:9,pct:19,c:'#0f9d8d'},
    {l:'Client',n:4,pct:8.5,c:'#059669'},
  ];
  document.getElementById('dash-pipeline').innerHTML=steps.map(s=>`
    <div class="funnel-step">
      <div style="width:72px;font-size:12px;color:var(--text-secondary);flex-shrink:0;">${s.l}</div>
      <div class="funnel-bar-wrap"><div class="funnel-bar" style="width:${s.pct}%;background:${s.c};"></div></div>
      <div style="font-size:12px;font-weight:600;min-width:20px;text-align:right;">${s.n}</div>
      <div style="font-size:10px;color:var(--text-secondary);min-width:32px;text-align:right;">${s.pct}%</div>
    </div>`).join('');
}
function updateKPIs(){
  document.getElementById('kpi-leads').textContent=leads.length;
  document.getElementById('badge-leads').textContent=leads.length;
}

/* ── MARKETPLACE ───────────────────────────────────────── */
function renderMarketplace(){
  const statusDot={active:'dot-active',busy:'dot-busy',idle:'dot-idle'};
  const statusLabel={active:'Actif',busy:'Occupe',idle:'Veille'};
  document.getElementById('mkt-cards').innerHTML=mktAgents.map(a=>`
    <div class="mkt-card" style="background:${a.color}20;border-color:${a.color}60;">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:12px;">
        <div class="mkt-agent-icon" style="background:${a.iconBg};">${a.icon}</div>
        <div style="display:flex;align-items:center;gap:5px;">
          <div class="agent-dot ${statusDot[a.status]}"></div>
          <span style="font-size:11px;font-weight:600;color:var(--text-secondary);">${statusLabel[a.status]}</span>
        </div>
      </div>
      <div style="font-size:14px;font-weight:600;color:var(--text-primary);margin-bottom:3px;">${a.name}</div>
      <div style="font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-secondary);margin-bottom:10px;">${a.role}</div>
      <div style="font-size:12px;color:var(--text-secondary);line-height:1.6;margin-bottom:14px;">${a.desc}</div>
      <div style="display:flex;flex-direction:column;gap:5px;">
        ${a.kpis.map(k=>`<div style="display:flex;align-items:center;gap:6px;font-size:12px;"><div style="width:4px;height:4px;border-radius:50%;background:#4361ee;flex-shrink:0;"></div>${k}</div>`).join('')}
      </div>
      <div style="margin-top:14px;display:flex;align-items:center;justify-content:space-between;">
        <span style="font-size:11px;background:#dcfce7;color:#166534;padding:3px 9px;border-radius:99px;font-weight:600;">Inclus dans Pro</span>
        <button class="btn-ghost" style="font-size:11px;padding:4px 10px;" onclick="toast('Configuration agent ${a.name}...','info')">Configurer</button>
      </div>
    </div>`).join('');
}

/* ── ARCHITECTURE ──────────────────────────────────────── */
let ckDone=0;
function renderArchitecture(){
  document.getElementById('scripts-list').innerHTML=scriptItems.map((s,i)=>`
    <div style="display:flex;align-items:center;justify-content:space-between;padding:12px;background:var(--bg-secondary);border-radius:8px;">
      <div>
        <div style="font-size:13px;font-weight:500;">${s.name}</div>
        <div style="font-size:11px;color:var(--text-secondary);margin-top:2px;">${s.desc}</div>
      </div>
      <div style="display:flex;gap:6px;">
        <span style="font-size:10px;background:#e2e8f0;color:#475569;padding:2px 7px;border-radius:4px;font-weight:600;">${s.lang}</span>
        <button class="btn-primary" style="font-size:11px;padding:4px 10px;" onclick="openScript(${i})">Voir</button>
      </div>
    </div>`).join('');

  document.getElementById('arch-checklist').innerHTML=checklistItems.map((c,i)=>`
    <div class="ck-item" onclick="toggleCheck(this)">
      <div class="ck-box"><svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L4 7L9 1" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg></div>
      <div>
        <div class="ck-text">${c.text}<span class="ctag ${c.tagClass}">${c.tag}</span></div>
        <div class="ck-sub">${c.sub}</div>
      </div>
    </div>`).join('');
  document.getElementById('ck-progress').textContent=`0 / ${checklistItems.length} etapes`;

  document.getElementById('budget-list').innerHTML=budgetItems.map(b=>`
    <div class="budget-item">
      <div>
        <div style="font-weight:500;">${b.label}</div>
        <div style="font-size:11px;color:var(--text-secondary);margin-top:2px;">${b.note}</div>
      </div>
      <div style="font-size:14px;font-weight:600;color:var(--text-primary);flex-shrink:0;margin-left:16px;">${b.cost}</div>
    </div>`).join('');
}
function toggleCheck(el){
  el.classList.toggle('done');
  const box=el.querySelector('.ck-box');
  box.style.background=el.classList.contains('done')?'#4361ee':'var(--bg-secondary)';
  box.style.borderColor=el.classList.contains('done')?'#4361ee':'var(--border)';
  ckDone=document.querySelectorAll('#arch-checklist .ck-item.done').length;
  document.getElementById('ck-progress').textContent=`${ckDone} / ${checklistItems.length} etapes`;
  if(ckDone===checklistItems.length)toast('Checklist complete — pret au lancement !','success');
}
function openScript(i){
  const s=scriptItems[i];
  currentScript=s.code;
  document.getElementById('script-title').textContent=s.name;
  document.getElementById('script-body').innerHTML=`
    <div style="margin-bottom:12px;font-size:13px;color:var(--text-secondary);">${s.desc}</div>
    <div class="code-block">
      <div class="code-header"><span class="code-lang">${s.lang}</span></div>
      <pre><code>${s.code.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</code></pre>
    </div>`;
  openModal('modal-script');
}
function copyScriptModal(){
  navigator.clipboard.writeText(currentScript).then(()=>toast('Code copie dans le presse-papiers','success'));
}

/* ── INIT ──────────────────────────────────────────────── */
renderLeads(leads);
renderConvList();renderThread();renderKanban();
renderTickets();renderAgents();renderBilling();renderToggles();
renderDashLog();renderMarketplace();renderArchitecture();renderOffre();
initTrial();

/* ── OFFRE ─────────────────────────────────────────────── */
let trialDays=3;
let isProActive=false;

function initTrial(){
  updateTrialUI();
  setInterval(()=>{}, 60000); // placeholder tick
}

function updateTrialUI(){
  const tb=document.getElementById('trial-banner');
  const ab=document.getElementById('active-banner');
  const td=document.getElementById('trial-days');
  const tdf=document.getElementById('trial-days-full');
  const kpi=document.getElementById('kpi-trial-days');
  if(isProActive){
    if(tb)tb.style.display='none';
    if(ab)ab.style.display='flex';
  } else {
    if(tb)tb.style.display='flex';
    if(ab)ab.style.display='none';
  }
  if(td)td.textContent=trialDays;
  if(tdf)tdf.textContent=trialDays;
  if(kpi)kpi.textContent=trialDays;
  const pct=Math.round((trialDays/7)*100);
  const bar=document.getElementById('trial-progress-bar');
  if(bar)bar.style.width=pct+'%';
  const lbl=document.getElementById('trial-status-label');
  if(lbl)lbl.innerHTML=isProActive
    ?'<span style="color:#22c55e;">Abonnement Pro Actif</span>'
    :`Essai gratuit en cours — <span id="trial-days-full">${trialDays}</span> jours restants`;
}

function switchToOfferView(){
  const btn=document.querySelector('[onclick="switchView(\'offre\',this)"]');
  if(btn){btn.click();}
  else{
    document.querySelectorAll('.view').forEach(el=>el.classList.remove('active'));
    const v=document.getElementById('view-offre');if(v)v.classList.add('active');
    const[t,s]=titles['offre'];
    document.getElementById('page-title').textContent=t;
    document.getElementById('page-sub').textContent=s;
    document.querySelectorAll('.nav-item').forEach(b=>b.classList.remove('active'));
  }
}

function activatePro(){
  const btn=event?event.target:null;
  if(btn){
    withLoader(btn,'Activation...',1200).then(()=>{
      isProActive=true;trialDays=0;
      updateTrialUI();
      toast('Abonnement Pro active — bienvenue !','success');
      btn.textContent='Pro Actif';btn.disabled=true;btn.style.background='#16a34a';
    });
  } else {
    isProActive=true;trialDays=0;updateTrialUI();
    toast('Abonnement Pro active','success');
  }
}

function renderOffre(){
  const trialChecklist=[
    {text:'Creer compte Gumroad + ajouter la page de vente',tag:'Gumroad',tagClass:'ctag-purple'},
    {text:'Configurer Stripe : Price 99 EUR, trial_period_days=7',tag:'Stripe',tagClass:'ctag-blue'},
    {text:'Deployer stripe_trial.py — remplacer VOTRE_PRICE_ID',tag:'Python',tagClass:'ctag-amber'},
    {text:'Enregistrer les 4 webhooks Stripe (subscription + invoice)',tag:'Webhooks',tagClass:'ctag-blue'},
    {text:'Lancer la campagne LinkedIn Ads 50 EUR/jour',tag:'LinkedIn',tagClass:'ctag-green'},
    {text:'Envoyer email de bienvenue via SendGrid apres inscription',tag:'Email',tagClass:'ctag-amber'},
  ];
  const el=document.getElementById('trial-checklist');
  if(!el)return;
  el.innerHTML=trialChecklist.map(c=>`
    <div class="ck-item" onclick="toggleCheck(this)" style="padding:10px 12px;margin-bottom:0;">
      <div class="ck-box" style="width:17px;height:17px;border-radius:4px;"><svg width="9" height="7" viewBox="0 0 10 8" fill="none"><path d="M1 4L4 7L9 1" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg></div>
      <div style="flex:1;"><div class="ck-text" style="font-size:12px;">${c.text}<span class="ctag ${c.tagClass}" style="font-size:9px;">${c.tag}</span></div></div>
    </div>`).join('');
}

</script>
</body>
</html>