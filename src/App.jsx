import { useState, useRef, useEffect } from “react”;

// ═══════════════════════════════════════════════════════════════════
// SWAP — COMPLETE v5
// Legal onboarding · Group + Individual closets · OOTD · Return prefs
// TN law + COPPA 2025 compliant · Large photo format · Face toggle
// Group access enforcement · SMS/text invite · In-closet IM chat
// ═══════════════════════════════════════════════════════════════════

const C = {
bg:”#FDF6EE”, ink:”#1A1A2E”, yellow:”#FFD93D”, coral:”#FF6B6B”,
sage:”#6BCB77”, sky:”#4D96FF”, lavender:”#C77DFF”, peach:”#FFAD8A”,
muted:”#9B8EA8”, card:”#FFFFFF”, border:”#EDE8E3”, red:”#FF3B3B”,
amber:”#F59E0B”, softPink:”#FFE8E8”, softYellow:”#FFF8DC”, teal:”#2DD4BF”,
purple:”#8B5CF6”,
};
const F = `'Georgia','Times New Roman',serif`;
const M = `'Courier New',monospace`;
const NOW  = Date.now();
const DAY  = 86400000;
const HOUR = 3600000;

// ─── LEGAL DOCUMENTS ─────────────────────────────────────────────
const SAFETY_GUIDELINES = `SWAP COMMUNITY SAFETY GUIDELINES

Your safety is our top priority. These rules keep every user comfortable and protected.

🔒 PRIVATE CIRCLES & GROUPS ONLY
Only people you personally invite can see your items. Never share your Group invite code with anyone you don’t know and trust in real life.

📸 CLOTHING PHOTOS ONLY (Closet Uploads)
Only upload photos of clothing items. NEVER upload photos of yourself, your face, your room, or anything showing where you live. This protects your privacy.

📸 STYLE FEED (OOTD Posts — Ages 13+ Only)
Users aged 13 and older may post outfit photos that include their face on the private Style Feed, visible only to Group members. Users under 13 are blocked from posting face photos per federal COPPA law. All OOTD photos are only visible to your invited Group members — never publicly.

👗 WHERE TO SWAP — TRUSTED LOCATIONS ONLY
All exchanges happen in person between Group members who already know and trust each other:

🏫 At school — lockers, hallways, library, common areas, before/after class
🚌 On the school bus — when riding together with friends in your Group
🏠 At a Group member’s home — when you are already there visiting as a friend, with a parent or trusted adult present or aware
📍 Any other location where a trusted adult knows you are together

NEVER exchange items with someone you only know through the app. All swaps must be between real-life friends who are already in each other’s lives.

🚫 NO PERSONAL INFORMATION
Never share your home address with someone you don’t already know in real life. Never use the app to arrange meeting a stranger.

🧹 RETURN ITEMS AS REQUESTED
Return all borrowed items by the agreed date and per the owner’s return preference (clean or unlaundered). Swap tracks all IOUs so there is a clear record.

⚠️ REPORT ANYTHING UNCOMFORTABLE
If any interaction makes you feel uncomfortable, use the Report button immediately. Your report is confidential.

👨‍👩‍👧 PARENTS ARE PART OF THIS
We encourage teens to let their parents know who they are swapping with and where. Parents have full rights to review account activity at any time.

🆘 IF YOU FEEL UNSAFE
Tell a trusted adult immediately. Contact us at safety@swapapp.com.`;

const PRIVACY_POLICY = `SWAP APP — CHILDREN’S PRIVACY POLICY
Effective: May 1, 2026 | Governing Law: State of Tennessee

NOTICE TO PARENTS: This app serves users aged 13–17 as a mixed-audience service. We comply fully with COPPA as amended by the FTC’s 2025 Final Rule (effective June 23, 2025) and Tennessee consumer protection law.

1. INFORMATION WE COLLECT FROM CHILDREN (UNDER 13)
   We do NOT knowingly collect personal information from children under 13 without verifiable parental consent. If a user identifies as under 13, we immediately route to a parent/guardian consent flow BEFORE any account is created. We collect only: parent email, phone, name, and child’s first name and school name.
1. INFORMATION WE COLLECT FROM ALL USERS
   • First name and chosen emoji
   • School name (for Group suggestions only)
   • Clothing item photos (closet uploads — clothing only)
   • Outfit photos (Style Feed — clothing, optionally including face for ages 13+ with parental consent)
   • App activity within private Groups
   • Device identifiers (session management only — NOT for advertising)

We do NOT collect: home address, full legal name of minors, government ID, financial data, or precise geolocation.

1. PHOTO UPLOADS
   Closet uploads must contain clothing items only — no people, faces, or locations. Style Feed (OOTD) posts may include the user’s face for users aged 13+ when parental consent has been provided per Tennessee Right of Publicity Act (T.C.A. § 47-25-1103). Face photos are blocked for users under 13. All photos are visible to invited Group members only — never publicly.
1. IN-PERSON EXCHANGES
   Swap coordinates clothing exchanges between teens who are real-life friends. Approved locations: school, the school bus, a Group friend’s home (when visiting as a friend with a parent or trusted adult aware), or anywhere a parent knows the teens are together. Swap does NOT arrange meetings between strangers.
1. THIRD-PARTY SHARING
   We do NOT sell or share children’s personal information with third parties for commercial or advertising purposes. Under the 2025 COPPA amendments, your parental consent covers internal use only.
1. PARENTAL RIGHTS (COPPA — FEDERALLY REQUIRED)
   ✦ REVIEW: Request a copy of your child’s data
   ✦ DELETE: Request deletion at any time
   ✦ REVOKE: Withdraw consent at any time (account deleted)
   ✦ RESTRICT: Consent to internal use without third-party sharing
   Contact: privacy@swapapp.com | Response within 5 business days.
1. DATA RETENTION
   • Active accounts: retained while active
   • Deleted accounts: purged within 30 days
   • Parental consent records: 3 years (COPPA requirement)
   • Photos: deleted within 30 days of account deletion
1. SECURITY
   We maintain a written Children’s Personal Information Security Program per the 2025 COPPA amendments, including encrypted storage, access controls, and annual security assessments.

Privacy Officer: privacy@swapapp.com`;

const TERMS_OF_SERVICE = `SWAP APP — TERMS OF SERVICE
Effective: May 1, 2026 | Jurisdiction: State of Tennessee

PLEASE READ CAREFULLY. THIS AGREEMENT CONTAINS A MUTUAL BINDING ARBITRATION CLAUSE IN SECTION 8 THAT AFFECTS YOUR LEGAL RIGHTS.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. ACCEPTANCE & ELIGIBILITY
   1.1 By using Swap, you agree to these Terms.
   1.2 Age Requirements:
   • Under 13: STRICTLY PROHIBITED.
   • Ages 13–17: Require verified parental consent per Section 3.
   • Ages 18+: May use Swap after agreeing to these Terms.
1. THE SERVICE
   2.1 Swap is a private, friend-group clothing coordination platform for browsing, requesting, borrowing, and tracking clothing items within invitation-only Groups of real-life friends.

2.2 Swap is a coordination platform ONLY. Swap does not own, inspect, clean, verify, transport, insure, or guarantee any item exchanged.

2.3 PHYSICAL EXCHANGES — IN-PERSON ONLY: All exchanges occur in person between Group members who are real-life friends. Approved locations: at school (lockers, hallways, common areas); on the school bus while riding together; at a Group member’s home when already visiting as a friend with a parent or trusted adult present or aware; or any location a parent or trusted adult knows about. Swap does NOT facilitate exchanges between strangers.

2.4 PHOTOS: Closet uploads must be clothing items only. Style Feed (OOTD) posts may include the user’s face for users aged 13+ with verified parental consent (Tennessee Right of Publicity Act, T.C.A. § 47-25-1103). Face photos are blocked for users under 13. All photos are visible to Group members only.

2.5 RETURN PREFERENCES: Item owners may specify a return preference (clean/washed or unlaundered). Borrowers agree to honor the owner’s stated preference and return items within the owner’s specified return window.

1. PARENTAL CONSENT & COPPA COMPLIANCE
   3.1 In compliance with COPPA (15 U.S.C. §§ 6501–6506) and the FTC’s 2025 Final Rule (effective June 23, 2025), Swap requires verifiable parental consent for users under 13, and parental review for users aged 13–17.

3.2 VPC Methods Accepted (per 2025 COPPA Rule §312.5):
(a) Text-Plus: Parent phone verification code + digital signature
(b) Knowledge-based authentication
(c) Digital signature with parent full legal name, email, and phone on file

3.3 Parents may review, correct, or delete their child’s data at any time: privacy@swapapp.com

1. USER CONDUCT
   4.1 All users agree to:
   (a) Upload clothing items only for closet — no photos of people, faces, or locations
   (b) Return borrowed items per the owner’s stated preference and within the agreed return window
   (c) Exchange items only at approved in-person locations (school, bus, Circle friend’s home when visiting, or anywhere a parent knows about)
   (d) Never share another user’s personal information

4.2 Zero tolerance for: harassment, bullying, sharing personal information, illegal activity.

1. DISCLAIMER OF LIABILITY
   TO THE MAXIMUM EXTENT PERMITTED BY TENNESSEE LAW, SWAP SHALL NOT BE LIABLE FOR:
   (a) The physical condition, cleanliness, or safety of any item
   (b) Loss, theft, or damage to any item
   (c) Personal injury arising from any in-person exchange
   (d) Any interaction between users on or off the platform
   (e) Any user-uploaded photo content, provided such content is not illegal
   THE SERVICE IS PROVIDED “AS IS” WITHOUT WARRANTIES OF ANY KIND.
1. INDEMNIFICATION
   You agree to defend, indemnify, and hold harmless Swap and its owners from any claims, damages, and expenses arising from your use of the Service, your content, or your violation of these Terms.
1. LIMITATION OF LIABILITY
   Swap’s total liability shall not exceed $100, to the maximum extent permitted by Tennessee law.
1. DISPUTE RESOLUTION — MUTUAL BINDING ARBITRATION
   ⚠️ PLEASE READ — THIS AFFECTS YOUR LEGAL RIGHTS

8.1 MUTUAL AGREEMENT TO ARBITRATE: Both YOU AND SWAP mutually agree that any dispute arising out of or relating to these Terms or the Service shall be resolved exclusively through binding arbitration rather than in court. This obligation applies equally to BOTH parties.
Compliant with the Tennessee Uniform Arbitration Act (T.C.A. §§ 29-5-301 et seq.) and the Federal Arbitration Act (9 U.S.C. § 1 et seq.).

8.2 AAA ADMINISTRATION: Arbitration shall be administered by the American Arbitration Association (AAA) under its Consumer Arbitration Rules (revised May 1, 2025). Swap has registered or will register this clause with the AAA Consumer Clause Registry before enforcing it, per AAA Rule 12.

8.3 PRE-ARBITRATION NOTICE: The aggrieved party must send written notice and allow 30 days for informal resolution before initiating arbitration. Send to: legal@swapapp.com.

8.4 ARBITRATION PROCESS:
(a) Single neutral arbitrator per AAA Consumer Rules
(b) Conducted virtually (default) or in Nashville, Tennessee
(c) Arbitrator may award any relief a court could award
(d) Decision is final and binding subject to TUAA/FAA review grounds
(e) Either party may seek emergency injunctive relief from courts in Davidson County, Tennessee

8.5 COSTS: Swap pays all AAA fees for claims under $10,000, unless frivolous. Claims over $10,000 follow AAA Consumer Fee Schedule.

8.6 CLASS ACTION WAIVER: Each party may only bring claims individually, not as a class representative.

8.7 JURY TRIAL WAIVER: Both parties waive the right to a jury trial.

8.8 SEVERABILITY: If the class action waiver is found unenforceable, this entire Section 8 is void and any class action proceeds in Davidson County, Tennessee.

8.9 OPT-OUT RIGHT: You may opt out within 30 days of first accepting these Terms by emailing legal@swapapp.com with subject “Arbitration Opt-Out.” Opting out does not affect your right to use Swap.

1. GOVERNING LAW & VENUE
   9.1 Governed by the laws of the State of Tennessee.
   9.2 For claims not subject to arbitration: exclusive venue is Davidson County, Tennessee (Nashville).
1. CONTACT
   Legal: legal@swapapp.com | Privacy/COPPA: privacy@swapapp.com`;

// ─── FEED SCORE ───────────────────────────────────────────────────
const feedScore = (item, userTags=[], userSize=“M”) => {
const freshness  = ((14 - Math.min(14,(NOW-item.addedAt)/DAY))/14)*40;
const social     = Math.min(30, item.likes*1.2 + item.reserves*4 + item.views*0.3);
const behavioral = Math.min(20, (userTags.some(t=>t.toLowerCase()===item.tag.toLowerCase())?20:0) + (item.size===userSize?5:0));
const hoursLeft  = item.expiresAt ? Math.max(0,(item.expiresAt-NOW)/HOUR) : 999;
const urgency    = hoursLeft<6?10:hoursLeft<12?6:hoursLeft<24?3:0;
return Math.round(freshness+social+behavioral+urgency);
};
const heatLabel = (s) => s>=75?{label:“🔥 Trending”,color:C.coral}:s>=50?{label:“✨ Fresh”,color:C.sky}:s>=25?{label:“👀 Active”,color:C.amber}:{label:“💤 Fading”,color:C.muted};

// ─── USERS & DATA ─────────────────────────────────────────────────
const ALL_USERS = [
{id:“u1”,name:“Emma”, emoji:“✨”,tags:[“clean girl”,“Y2K”],  size:“M”, followers:34,streak:7 },
{id:“u2”,name:“Zoe”,  emoji:“🌸”,tags:[“cottagecore”,“boho”],size:“S”, followers:51,streak:3 },
{id:“u3”,name:“Mia”,  emoji:“🦋”,tags:[“Y2K”,“vintage”],     size:“S”, followers:28,streak:5 },
{id:“u4”,name:“Ava”,  emoji:“🔥”,tags:[“streetwear”,“indie”],size:“L”, followers:67,streak:12},
{id:“u5”,name:“Jade”, emoji:“🌙”,tags:[“party mode”,“glam”], size:“S”, followers:43,streak:1 },
{id:“u6”,name:“Riley”,emoji:“🍓”,tags:[“preppy”,“clean girl”],size:“M”,followers:19,streak:9 },
{id:“u7”,name:“Nova”, emoji:“⭐”,tags:[“boho”,“vintage”],     size:“XS”,followers:22,streak:4 },
];
const ME = ALL_USERS[0];

const INIT_ITEMS = [
{id:101,ownerId:“u1”,owner:“Emma”, ownerEmoji:“✨”,item:“White Crop Blazer”,     size:“M”, tag:“clean girl”, emoji:“✨”,color:C.lavender,status:“available”,likes:9, reserves:1,views:33,addedAt:NOW-4*DAY,  desc:“Classic clean girl look.”,    returnDays:5,returnPref:“clean”,      expiresAt:NOW+14*HOUR,interested:2},
{id:102,ownerId:“u1”,owner:“Emma”, ownerEmoji:“✨”,item:“Plaid Mini Skirt”,       size:“M”, tag:“preppy”,     emoji:“🩷”,color:C.softPink,status:“available”,likes:6, reserves:0,views:14,addedAt:NOW-1*DAY,  desc:“Very Cher from Clueless.”,    returnDays:5,returnPref:“clean”,      expiresAt:NOW+30*HOUR,interested:0},
{id:103,ownerId:“u1”,owner:“Emma”, ownerEmoji:“✨”,item:“Y2K Baby Tee”,           size:“S”, tag:“Y2K”,        emoji:“👕”,color:C.sky,      status:“borrowed”, likes:15,reserves:0,views:52,addedAt:NOW-6*DAY,  desc:“Y2K butterfly print.”,        returnDays:3,returnPref:“unlaundered”,expiresAt:null,       interested:3},
{id:201,ownerId:“u2”,owner:“Zoe”,  ownerEmoji:“🌸”,item:“Oversized Denim Jacket”, size:“M”, tag:“Y2K”,        emoji:“🧥”,color:C.sky,      status:“available”,likes:7, reserves:1,views:24,addedAt:NOW-2*DAY,  desc:“Perfect vintage wash.”,       returnDays:5,returnPref:“clean”,      expiresAt:NOW+6*HOUR, interested:3},
{id:202,ownerId:“u2”,owner:“Zoe”,  ownerEmoji:“🌸”,item:“Crochet Cardigan”,       size:“M”, tag:“boho”,       emoji:“🧶”,color:C.peach,    status:“available”,likes:14,reserves:0,views:39,addedAt:NOW-0.5*DAY,desc:“Handmade, so special.”,       returnDays:5,returnPref:“clean”,      expiresAt:NOW+22*HOUR,interested:0},
{id:203,ownerId:“u2”,owner:“Zoe”,  ownerEmoji:“🌸”,item:“Floral Wrap Dress”,      size:“S”, tag:“cottagecore”,emoji:“🌸”,color:C.peach,    status:“available”,likes:21,reserves:2,views:67,addedAt:NOW-3*DAY,  desc:“Perfect for picnics.”,        returnDays:7,returnPref:“clean”,      expiresAt:NOW+10*HOUR,interested:4},
{id:301,ownerId:“u3”,owner:“Mia”,  ownerEmoji:“🦋”,item:“Floral Mini Skirt”,      size:“S”, tag:“cottagecore”,emoji:“🌷”,color:C.peach,    status:“available”,likes:12,reserves:0,views:41,addedAt:NOW-1*DAY,  desc:“Elastic waist, super comfy.”, returnDays:3,returnPref:“unlaundered”,expiresAt:NOW+18*HOUR,interested:1},
{id:302,ownerId:“u3”,owner:“Mia”,  ownerEmoji:“🦋”,item:“Y2K Butterfly Clips”,    size:“OS”,tag:“Y2K”,        emoji:“🦋”,color:C.lavender, status:“available”,likes:31,reserves:1,views:112,addedAt:NOW-0.2*DAY,desc:“Literally iconic.”,           returnDays:3,returnPref:“clean”,      expiresAt:NOW+4*HOUR, interested:6},
{id:401,ownerId:“u4”,owner:“Ava”,  ownerEmoji:“🔥”,item:“Leather Mini Skirt”,     size:“S”, tag:“streetwear”, emoji:“🖤”,color:C.ink,      status:“available”,likes:22,reserves:3,views:97,addedAt:NOW-3*DAY,  desc:“Absolute statement piece.”,   returnDays:7,returnPref:“clean”,      expiresAt:NOW+10*HOUR,interested:4},
{id:501,ownerId:“u5”,owner:“Jade”, ownerEmoji:“🌙”,item:“Sequin Going-Out Top”,   size:“S”, tag:“party mode”, emoji:“💫”,color:C.yellow,   status:“borrowed”, likes:19,reserves:2,views:88,addedAt:NOW-8*DAY,  desc:“Absolute showstopper.”,       returnDays:5,returnPref:“clean”,      expiresAt:null,       interested:5},
{id:502,ownerId:“u5”,owner:“Jade”, ownerEmoji:“🌙”,item:“Satin Slip Dress”,        size:“S”, tag:“soft glam”,  emoji:“✨”,color:C.lavender, status:“available”,likes:33,reserves:1,views:104,addedAt:NOW-2*DAY,  desc:“Perfect for any occasion.”,   returnDays:5,returnPref:“unlaundered”,expiresAt:NOW+8*HOUR, interested:5},
{id:601,ownerId:“u6”,owner:“Riley”,ownerEmoji:“🍓”,item:“Vintage Band Tee”,       size:“XS”,tag:“indie”,       emoji:“🎸”,color:C.coral,    status:“available”,likes:8, reserves:0,views:22,addedAt:NOW-16*DAY, desc:“Handle with care!”,           returnDays:3,returnPref:“clean”,      expiresAt:NOW+1*HOUR, interested:1},
{id:701,ownerId:“u7”,owner:“Nova”, ownerEmoji:“⭐”,item:“Boho Maxi Skirt”,         size:“XS”,tag:“boho”,       emoji:“🌊”,color:C.teal,     status:“available”,likes:11,reserves:0,views:29,addedAt:NOW-2*DAY,  desc:“Flowy and dreamy.”,           returnDays:5,returnPref:“clean”,      expiresAt:NOW+20*HOUR,interested:0},
];

const INIT_GROUPS = [
{id:“g1”,name:“Varsity Crew”,   emoji:“🏆”,color:C.yellow,  members:[“u1”,“u2”,“u3”,“u4”],createdBy:“u1”,code:“VC-2847”,desc:“The OG squad 💛”,  isSharedCloset:true, sharedItems:[101,201,301,401],activity:“Zoe added 2 items · 3h ago”},
{id:“g2”,name:“Sophomore Babes”,emoji:“🦋”,color:C.lavender,members:[“u1”,“u3”,“u5”,“u6”,“u7”],createdBy:“u3”,code:“SB-5591”,desc:“Sophomore forever 💜”,isSharedCloset:true,sharedItems:[102,302,502,601,701],activity:“Jade’s Top back soon · 1h ago”},
{id:“g3”,name:“Art Club”,       emoji:“🎨”,color:C.teal,    members:[“u1”,“u7”],          createdBy:“u7”,code:“AC-3314”,desc:“Weird fits only 🎨”,isSharedCloset:false,sharedItems:[103,701],activity:“Nova joined · 2d ago”},
];

const INIT_OOTDS = [
{id:1,userId:“u2”,user:“Zoe 🌸”,text:“Wearing Mia’s skirt with white sneakers 🔥 obsessed”,likes:24,time:“2h ago”,color:C.softPink,showsFace:false},
{id:2,userId:“u4”,user:“Ava 🔥”,text:“Lily’s blazer goes with EVERYTHING. Returning it is gonna hurt”,likes:31,time:“5h ago”,color:”#F0F7FF”,showsFace:false},
{id:3,userId:“u5”,user:“Jade 🌙”,text:“The sequin top just made me homecoming queen material 💫 thank u swap”,likes:47,time:“1d ago”,color:”#F5F0FF”,showsFace:false},
];

const PUSH_NOTIFS = [
{id:1,cat:“transactional”,emoji:“🔥”,text:“Zoe wants your White Crop Blazer”,sub:“Tap to respond”,time:“2m ago”,unread:true},
{id:2,cat:“urgency”,      emoji:“⏳”,text:“Offer expiring in 1 hour”,         sub:“Vintage Band Tee — decide now”,time:“1h left”,unread:true},
{id:3,cat:“social”,       emoji:“❤️”,text:“Your closet got 8 visits today”,   sub:“Items getting attention 👀”,time:“3:45PM”,unread:true},
];

// ─── GROUP ACCESS ENFORCEMENT ─────────────────────────────────────
// Only members of a group can see that group’s items.
// itemIsVisibleToUser: returns true only if user is a member of at
// least one group that has shared this item.
const itemIsVisibleToUser = (item, userGroups) =>
userGroups.some(g => g.members.includes(ME.id) && g.sharedItems.includes(item.id));

// getAccessibleItems: filters the full catalogue to only items the
// current user can legitimately see through their group memberships.
const getAccessibleItems = (allItems, userGroups) =>
allItems.filter(i => i.ownerId === ME.id || itemIsVisibleToUser(i, userGroups));

// ─── INVITE / SMS SYSTEM ──────────────────────────────────────────
// Simulates the invite flow. In production:
//   iOS  → window.location = “sms:+15551234567&body=…”
//   Android → window.location = “sms:+15551234567?body=…”
// Both deeplink back to the app with ?invite=CODE in the URL.

const buildSmsLink = (code, groupName, phone = “”) => {
const msg = encodeURIComponent(
`Hey! I'm inviting you to join my group "${groupName}" on Swap — the private clothes sharing app. ` +
`Download Swap and use my invite code: ${code}  ` +
`(Already on Swap? Just open the app and enter the code to get instant access to our group closet!)`
);
// iOS uses & Android uses ? — we try both via the safer format
const num = phone.replace(/\D/g,””);
return num ? `sms:${num}&body=${msg}` : `sms:&body=${msg}`;
};

// Simulated pending invite requests (would be server-side in production)
const INIT_PENDING_INVITES = [
{id:“inv1”, groupId:“g1”, code:“VC-2847”, name:“Sofia”, phone:”+16155550192”, sentAt:NOW-30*60000, status:“pending”},
];

// ─── IM / CHAT DATA ───────────────────────────────────────────────
// Keyed by userId for DMs, keyed by groupId for group chats
const INIT_DM_THREADS = {
u2: [
{id:1,from:“u2”,text:“Hey! Love your white blazer 😍”,time:“2h ago”},
{id:2,from:“u1”,text:“Thank you!! It’s so versatile 🤍”,time:“1h ago”},
{id:3,from:“u2”,text:“Can I borrow it for Friday??”,time:“45m ago”},
],
u4: [
{id:1,from:“u4”,text:“Did you get my reserve request on the cargo pants?”,time:“3h ago”},
{id:2,from:“u1”,text:“Yes! They’re yours after Jade returns them 🙌”,time:“2h ago”},
],
u3: [
{id:1,from:“u3”,text:“Obsessed with your plaid skirt btw”,time:“yesterday”},
],
};

const INIT_GROUP_CHATS = {
g1: [
{id:1,from:“u2”,text:“Anyone have a good going-out top for Saturday? 🎉”,time:“1h ago”},
{id:2,from:“u4”,text:“Jade’s sequin top when it comes back!!”,time:“58m ago”},
{id:3,from:“u1”,text:“I can put it on reserve for you Zoe 👀”,time:“55m ago”},
{id:4,from:“u3”,text:“Also my butterfly clips go with literally everything fyi”,time:“40m ago”},
],
g2: [
{id:1,from:“u5”,text:“New OOTD posted — swap life is real 💫”,time:“3h ago”},
{id:2,from:“u6”,text:“WAIT your sequin top is everything”,time:“2h ago”},
],
g3: [
{id:1,from:“u7”,text:“Hey everyone! Just joined — excited to swap 🎨”,time:“2d ago”},
{id:2,from:“u1”,text:“Welcome Nova!! Check out our shared items 👗”,time:“1d ago”},
],
};

// ─── UI ATOMS ─────────────────────────────────────────────────────
const Btn = ({children,onClick,variant=“primary”,full,disabled,small,xs,style={}}) => {
const vs={primary:{background:C.ink,color:C.yellow,border:`2px solid ${C.ink}`},secondary:{background:“transparent”,color:C.ink,border:`2px solid ${C.ink}`},success:{background:C.sage,color:“white”,border:`2px solid ${C.sage}`},coral:{background:C.coral,color:“white”,border:`2px solid ${C.coral}`},ghost:{background:“transparent”,color:C.muted,border:`2px solid ${C.border}`},teal:{background:C.teal,color:“white”,border:`2px solid ${C.teal}`},yellow:{background:C.yellow,color:C.ink,border:`2px solid ${C.yellow}`},purple:{background:C.purple,color:“white”,border:`2px solid ${C.purple}`}};
return <button onClick={onClick} disabled={disabled} style={{…vs[variant],borderRadius:12,fontFamily:M,fontWeight:800,cursor:disabled?“not-allowed”:“pointer”,letterSpacing:.3,transition:“all .15s”,padding:xs?“5px 10px”:small?“8px 13px”:“12px 18px”,fontSize:xs?10:small?11:13,opacity:disabled?.5:1,width:full?“100%”:“auto”,…style}}>{children}</button>;
};
const Badge = ({children,color=C.ink,style={}}) => <span style={{display:“inline-block”,background:`${color}22`,color,fontSize:9,fontWeight:700,padding:“3px 9px”,borderRadius:20,letterSpacing:.5,textTransform:“uppercase”,fontFamily:M,…style}}>{children}</span>;
const CheckRow = ({checked,onChange,children}) => (
<label style={{display:“flex”,gap:12,alignItems:“flex-start”,cursor:“pointer”,marginBottom:12}}>
<input type=“checkbox” checked={checked} onChange={onChange} style={{marginTop:4,width:18,height:18,cursor:“pointer”,flexShrink:0,accentColor:C.ink}}/>
<span style={{fontSize:13,fontFamily:F,color:C.ink,lineHeight:1.6}}>{children}</span>
</label>
);
const ScrollBox = ({children,onScrollEnd,style={}}) => {
const h = (e) => { const el=e.target; if(el.scrollTop+el.clientHeight>=el.scrollHeight-30&&onScrollEnd) onScrollEnd(); };
return <div onScroll={h} style={{overflowY:“auto”,fontSize:11,fontFamily:M,lineHeight:1.9,whiteSpace:“pre-wrap”,color:C.ink,background:C.card,border:`2px solid ${C.border}`,borderRadius:14,padding:16,…style}}>{children}</div>;
};
const ProgressBar = ({current,total}) => (

  <div style={{display:"flex",gap:5,alignItems:"center",marginBottom:20}}>
    {Array.from({length:total}).map((_,i)=><div key={i} style={{height:4,borderRadius:2,transition:"all .3s",background:i<current?C.ink:C.border,flex:i===current-1?2:1}}/>)}
    <span style={{fontSize:10,color:C.muted,fontFamily:M,flexShrink:0}}>{current}/{total}</span>
  </div>
);
const InpField = ({label,value,onChange,placeholder,type="text",style={}}) => (
  <div style={{marginBottom:12}}>
    {label&&<div style={{fontSize:10,fontFamily:M,color:C.muted,letterSpacing:.8,textTransform:"uppercase",marginBottom:5}}>{label}</div>}
    <input type={type} value={value} onChange={onChange} placeholder={placeholder} style={{width:"100%",padding:"12px 14px",borderRadius:12,boxSizing:"border-box",border:`2px solid ${value?C.ink:C.border}`,fontSize:14,fontFamily:F,background:C.bg,outline:"none",...style}}/>
  </div>
);
function MemberAvatars({memberIds,max=4,size=28}) {
  const shown=memberIds.slice(0,max); const extra=memberIds.length-max;
  return <div style={{display:"flex",alignItems:"center"}}>
    {shown.map((uid,i)=>{const u=ALL_USERS.find(x=>x.id===uid); return <div key={uid} style={{width:size,height:size,borderRadius:"50%",background:`${C.yellow}40`,border:`2px solid ${C.bg}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*.45,marginLeft:i>0?-size*.3:0,zIndex:10-i,flexShrink:0}}>{u?.emoji||"👤"}</div>;})}
    {extra>0&&<div style={{width:size,height:size,borderRadius:"50%",background:C.border,border:`2px solid ${C.bg}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontFamily:M,fontWeight:800,color:C.muted,marginLeft:-size*.3}}>+{extra}</div>}
  </div>;
}

// ─── PUSH TOAST ───────────────────────────────────────────────────
function PushToast({notif,onDismiss}) {
useEffect(()=>{const t=setTimeout(onDismiss,5000);return()=>clearTimeout(t);},[]);
const bc={transactional:C.coral,social:C.lavender,urgency:C.amber}[notif.cat]||C.border;
return <div style={{position:“fixed”,top:14,left:“50%”,transform:“translateX(-50%)”,background:C.ink,borderRadius:18,padding:“14px 18px”,width:340,boxShadow:“0 12px 40px rgba(26,26,46,.5)”,zIndex:999,border:`2px solid ${bc}`,animation:“slideDown .3s ease”}}>
<style>{`@keyframes slideDown{from{opacity:0;transform:translateX(-50%) translateY(-18px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}`}</style>
<div style={{display:“flex”,gap:12,alignItems:“flex-start”}}>
<div style={{fontSize:24}}>{notif.emoji}</div>
<div style={{flex:1}}><div style={{color:“white”,fontWeight:800,fontSize:13,fontFamily:F}}>{notif.text}</div>{notif.sub&&<div style={{color:C.muted,fontSize:11,fontFamily:M,marginTop:2}}>{notif.sub}</div>}</div>
<button onClick={onDismiss} style={{background:“none”,border:“none”,color:C.muted,fontSize:16,cursor:“pointer”}}>✕</button>
</div>

  </div>;
}

// ─── POST FEEDBACK TOAST ──────────────────────────────────────────
function PostFeedback({onDismiss}) {
const [phase,setPhase]=useState(0);
const phases=[{emoji:“🚀”,text:“Posted!”,sub:“Notifying your Group…”,color:C.sage},{emoji:“📣”,text:“3 members notified”,sub:“Your OOTD is live in the feed”,color:C.sky},{emoji:“🔥”,text:“You’re boosted this hour!”,sub:“Fresh posts get 3× more views”,color:C.coral}];
useEffect(()=>{const t1=setTimeout(()=>setPhase(1),900);const t2=setTimeout(()=>setPhase(2),2100);const t3=setTimeout(onDismiss,4200);return()=>[t1,t2,t3].forEach(clearTimeout);},[]);
const p=phases[phase];
return <div style={{position:“fixed”,bottom:100,left:“50%”,transform:“translateX(-50%)”,background:p.color,borderRadius:18,padding:“14px 20px”,zIndex:999,boxShadow:`0 8px 32px ${p.color}55`,maxWidth:300,textAlign:“center”,transition:“all .4s ease”}}>
<div style={{fontSize:28,marginBottom:4}}>{p.emoji}</div>
<div style={{color:“white”,fontWeight:900,fontSize:15,fontFamily:F}}>{p.text}</div>
<div style={{color:“rgba(255,255,255,.8)”,fontSize:11,fontFamily:M,marginTop:3}}>{p.sub}</div>

  </div>;
}

// ═══════════════════════════════════════════════════════════════════
// LEGAL ONBOARDING FLOW
// ═══════════════════════════════════════════════════════════════════
function LegalFlow({onComplete}) {
const [step,setStep]=useState(0);
const [ageGroup,setAgeGroup]=useState(null);
const [safetyDone,setSafetyDone]=useState(false);
const [privacyDone,setPrivacyDone]=useState(false);
const [termsDone,setTermsDone]=useState(false);
const [privacyOk,setPrivacyOk]=useState(false);
const [termsOk,setTermsOk]=useState(false);
const [arbOk,setArbOk]=useState(false);
const [parentName,setParentName]=useState(””);
const [parentEmail,setParentEmail]=useState(””);
const [parentPhone,setParentPhone]=useState(””);
const [parentSig,setParentSig]=useState(””);
const [pConsent,setPConsent]=useState(false);
const [pData,setPData]=useState(false);
const [pArb,setPArb]=useState(false);
const [pPrivacy,setPPrivacy]=useState(false);
const [pPhoto,setPPhoto]=useState(false);
const [verifyCode]=useState(Math.floor(100000+Math.random()*900000).toString());
const [codeIn,setCodeIn]=useState(””);
const [verified,setVerified]=useState(false);
const [name,setName]=useState(””); const [school,setSchool]=useState(””); const [emoji,setEmoji]=useState(“✨”);
const emojis=[“🌸”,“🦋”,“🎀”,“🔥”,“🌙”,“🌈”,“⭐”,“🍓”,“🎨”,“✨”,“🌷”,“💫”];
const isMinor=ageGroup===“under13”||ageGroup===“13to17”;
const total=isMinor?7:5;

if(step===0) return(
<div style={{background:C.ink,minHeight:“100vh”,display:“flex”,flexDirection:“column”,alignItems:“center”,justifyContent:“center”,padding:“40px 28px”,textAlign:“center”}}>
<div style={{fontSize:72,marginBottom:16}}>👗</div>
<div style={{fontSize:44,fontWeight:900,color:C.yellow,fontFamily:F,letterSpacing:-2,marginBottom:4}}>swap</div>
<div style={{color:C.muted,fontSize:11,fontFamily:M,letterSpacing:4,marginBottom:28,textTransform:“uppercase”}}>✦ share the vibe</div>
<div style={{color:”#ccc”,fontSize:15,fontFamily:F,lineHeight:1.8,marginBottom:36,maxWidth:300}}>The private clothes-sharing app for you and your trusted friend groups. Before joining, we need 3 minutes to walk through our legal agreements.</div>
<div style={{display:“flex”,flexDirection:“column”,gap:10,width:“100%”}}>
<Btn full onClick={()=>setStep(1)}>Let’s Get Started ✦</Btn>
<Btn full variant="ghost" onClick={onComplete}>Skip (Guest Mode)</Btn>
</div>
<div style={{color:”#555”,fontSize:10,fontFamily:M,marginTop:20,lineHeight:1.8}}>Users under 13 not permitted.{”\n”}Users 13–17 require verified parental consent.{”\n”}COPPA 2025 & Tennessee law compliant.</div>
</div>
);

if(step===1) return(
<div style={{background:C.bg,minHeight:“100vh”,padding:“32px 24px”}}>
<ProgressBar current={1} total={total||5}/>
<div style={{fontSize:24,fontWeight:900,fontFamily:F,color:C.ink,marginBottom:8}}>How old are you?</div>
<div style={{color:C.muted,fontSize:13,fontFamily:F,lineHeight:1.6,marginBottom:24}}>Federal law (COPPA) and Tennessee law require parental consent for minors. Your answer determines the right path.</div>
<div style={{display:“flex”,flexDirection:“column”,gap:10,marginBottom:20}}>
{[{val:“under13”,label:“I’m under 13”,sub:“A parent must complete registration on your behalf.”,emoji:“🧒”},{val:“13to17”,label:“I’m 13–17”,sub:“A parent must review and consent before your account is created.”,emoji:“🧑‍🎓”},{val:“18plus”,label:“I’m 18 or older”,sub:“You may create your account after agreeing to our Terms.”,emoji:“🙋”}].map(opt=>(
<button key={opt.val} onClick={()=>setAgeGroup(opt.val)} style={{background:ageGroup===opt.val?C.ink:C.card,border:`2px solid ${ageGroup===opt.val?C.ink:C.border}`,borderRadius:16,padding:“14px 16px”,cursor:“pointer”,textAlign:“left”,display:“flex”,alignItems:“flex-start”,gap:12}}>
<span style={{fontSize:24}}>{opt.emoji}</span>
<div><div style={{fontWeight:800,fontSize:14,fontFamily:F,color:ageGroup===opt.val?C.yellow:C.ink}}>{opt.label}</div><div style={{fontSize:11,color:ageGroup===opt.val?”#bbb”:C.muted,fontFamily:M,marginTop:2,lineHeight:1.4}}>{opt.sub}</div></div>
</button>
))}
</div>
{ageGroup===“under13”&&<div style={{background:`${C.red}18`,border:`2px solid ${C.red}`,borderRadius:12,padding:12,marginBottom:14,fontSize:12,fontFamily:F,color:C.red,lineHeight:1.6}}>⚠️ Users under 13 cannot self-register. A parent must complete the entire registration. Please hand the device to your parent now.</div>}
{ageGroup===“13to17”&&<div style={{background:`${C.amber}25`,border:`2px solid ${C.amber}`,borderRadius:12,padding:12,marginBottom:14,fontSize:12,fontFamily:F,color:”#7C5B00”,lineHeight:1.6}}>⚠️ Your parent or guardian must review our terms and provide verified consent before your account is created.</div>}
<Btn full onClick={()=>ageGroup&&setStep(2)} disabled={!ageGroup}>Continue →</Btn>
</div>
);

if(step===2) return(
<div style={{display:“flex”,flexDirection:“column”,height:“100vh”,background:C.bg}}>
<div style={{padding:“24px 20px 14px”,borderBottom:`1px solid ${C.border}`}}><ProgressBar current={2} total={total}/><div style={{fontSize:22,fontWeight:900,fontFamily:F,color:C.ink}}>Safety First 🛡️</div><div style={{color:C.muted,fontSize:12,fontFamily:F,marginTop:4}}>{isMinor?“Read with your parent. Scroll to the bottom.”:“Read our community safety rules.”}</div></div>
<ScrollBox onScrollEnd={()=>setSafetyDone(true)} style={{flex:1,margin:“12px 16px 0”}}>{SAFETY_GUIDELINES}</ScrollBox>
<div style={{padding:“12px 20px 20px”}}>
{!safetyDone&&<div style={{textAlign:“center”,fontSize:11,color:C.muted,fontFamily:M,marginBottom:8}}>↓ Scroll to read all guidelines</div>}
{safetyDone&&<CheckRow checked={safetyDone} onChange={()=>{}}>I have read and understand the Swap Community Safety Guidelines.</CheckRow>}
<Btn full onClick={()=>safetyDone&&setStep(3)} disabled={!safetyDone}>{safetyDone?“Continue →”:“Scroll to Continue ↓”}</Btn>
</div>
</div>
);

if(step===3) return(
<div style={{display:“flex”,flexDirection:“column”,height:“100vh”,background:C.bg}}>
<div style={{padding:“24px 20px 14px”,borderBottom:`1px solid ${C.border}`}}><ProgressBar current={3} total={total}/><div style={{fontSize:22,fontWeight:900,fontFamily:F,color:C.ink}}>Privacy Policy</div><div style={{color:C.muted,fontSize:12,fontFamily:F,marginTop:4}}>How we handle {isMinor?“your child’s”:“your”} data, including COPPA rights.</div></div>
<ScrollBox onScrollEnd={()=>setPrivacyDone(true)} style={{flex:1,margin:“12px 16px 0”}}>{PRIVACY_POLICY}</ScrollBox>
<div style={{padding:“12px 20px 20px”}}>
{!privacyDone&&<div style={{textAlign:“center”,fontSize:11,color:C.muted,fontFamily:M,marginBottom:8}}>↓ Scroll to read the full Privacy Policy</div>}
{privacyDone&&<CheckRow checked={privacyOk} onChange={e=>setPrivacyOk(e.target.checked)}>I have read and understand the Swap Privacy Policy, including COPPA rights and the photo/face-photo rules.</CheckRow>}
<Btn full onClick={()=>privacyOk&&setStep(4)} disabled={!privacyOk}>{privacyDone?“Accept & Continue →”:“Scroll to Continue ↓”}</Btn>
</div>
</div>
);

if(step===4) return(
<div style={{display:“flex”,flexDirection:“column”,height:“100vh”,background:C.bg}}>
<div style={{padding:“24px 20px 14px”,borderBottom:`1px solid ${C.border}`}}><ProgressBar current={4} total={total}/><div style={{fontSize:22,fontWeight:900,fontFamily:F,color:C.ink}}>Terms of Service</div><div style={{color:C.muted,fontSize:12,fontFamily:F,marginTop:4}}>Includes mutual arbitration clause (Section 8). Must read fully.</div></div>
<ScrollBox onScrollEnd={()=>setTermsDone(true)} style={{flex:1,margin:“12px 16px 0”}}>{TERMS_OF_SERVICE}</ScrollBox>
<div style={{padding:“12px 20px 20px”}}>
{!termsDone&&<div style={{textAlign:“center”,fontSize:11,color:C.muted,fontFamily:M,marginBottom:8}}>↓ Scroll to the bottom to unlock acceptance</div>}
{termsDone&&<>
<CheckRow checked={termsOk} onChange={e=>setTermsOk(e.target.checked)}>I have read and agree to Swap’s Terms of Service.</CheckRow>
<div style={{background:`${C.amber}25`,border:`2px solid ${C.amber}`,borderRadius:12,padding:12,marginBottom:10}}>
<div style={{fontSize:11,fontWeight:800,fontFamily:M,color:”#7C5B00”,marginBottom:6}}>⚖️ MUTUAL ARBITRATION — READ CAREFULLY</div>
<div style={{fontSize:11,fontFamily:F,color:C.ink,lineHeight:1.6,marginBottom:8}}>Section 8 is a <strong>mutual binding arbitration clause</strong>. Both you AND Swap agree to resolve disputes through arbitration, not court. Both parties waive the right to a jury trial. You may opt out within 30 days by emailing legal@swapapp.com.</div>
<CheckRow checked={arbOk} onChange={e=>setArbOk(e.target.checked)}>I have read Section 8, understand I am agreeing to mutual binding arbitration, and understand my 30-day opt-out right.</CheckRow>
</div>
</>}
<Btn full onClick={()=>termsOk&&arbOk&&setStep(isMinor?5:6)} disabled={!termsOk||!arbOk}>{termsDone?“Accept & Continue →”:“Scroll to Continue ↓”}</Btn>
</div>
</div>
);

if(step===5&&isMinor) return(
<div style={{background:C.bg,minHeight:“100vh”,overflowY:“auto”,paddingBottom:40}}>
<div style={{padding:“24px 20px 14px”}}><ProgressBar current={5} total={total}/><div style={{fontSize:22,fontWeight:900,fontFamily:F,color:C.ink,marginBottom:6}}>Parental Consent</div><div style={{color:C.muted,fontSize:13,fontFamily:F,lineHeight:1.6}}>COPPA and Tennessee law require a parent or legal guardian to verify consent. Hand the device to your parent now.</div></div>
<div style={{padding:“0 16px”}}>
<div style={{background:C.yellow,border:`2px solid ${C.ink}`,borderRadius:16,padding:18,marginBottom:16}}>
<div style={{fontWeight:800,fontFamily:M,fontSize:13,marginBottom:8}}>👋 Hello, Parent or Guardian</div>
<div style={{fontSize:13,fontFamily:F,lineHeight:1.8}}>
Your {ageGroup===“under13”?“child”:“teen”} wants to use <strong>Swap</strong> — a private clothing sharing app.{”\n\n”}
<strong>What Swap is:</strong> A coordination tool for sharing clothes with trusted, invited friend groups. All exchanges happen in person between teens who are real-life friends. Approved exchange locations: at school (lockers, hallways, common areas), on the school bus while riding together, at a Group member’s home when already visiting as a friend with a parent or trusted adult present or aware, or any location where a parent knows the teens are together.{”\n\n”}
<strong>What Swap is NOT:</strong> Swap does not connect teens with strangers. All Group members must be real-life friends invited personally.{”\n\n”}
<strong>Photos:</strong> Closet uploads are clothing-only. On the private Style Feed (OOTD), users aged 13+ may post outfit photos including their face, visible only to Group members. This requires your explicit consent below (Tennessee Right of Publicity Act). Users under 13 are blocked from posting face photos.{”\n\n”}
<strong>Return preferences:</strong> When sharing items, your child sets whether borrowers should return items clean (freshly laundered) or unlaundered. This preference is shown to borrowers and tracked in the app.{”\n\n”}
<strong>Your COPPA rights:</strong> You may review, correct, or delete your child’s data at any time: privacy@swapapp.com
</div>
</div>
<div style={{background:`${C.sky}20`,border:`2px solid ${C.sky}`,borderRadius:12,padding:14,marginBottom:14}}>
<div style={{fontWeight:800,fontFamily:M,fontSize:11,marginBottom:6,color:”#0066AA”}}>📋 COPPA — DATA WE COLLECT FROM YOUR CHILD</div>
<div style={{fontSize:12,fontFamily:F,lineHeight:1.7}}>
<strong>Collected:</strong> First name, school name, chosen emoji, clothing item photos, outfit posts (OOTD), and in-app activity within private Groups.{”\n\n”}
<strong>Face photos:</strong> If your child is 13 or older, they may post outfit photos including their face on the private Style Feed, visible only to Group members. Users under 13 are blocked. Your consent below explicitly covers this per Tennessee’s Right of Publicity Act (T.C.A. § 47-25-1103).{”\n\n”}
<strong>NOT collected:</strong> Full legal name, home address, precise location, financial info, government ID, or biometrics.{”\n\n”}
<strong>Sharing:</strong> We do NOT share your child’s data with third parties for commercial or advertising purposes.
</div>
</div>
<InpField label=“Parent / Guardian Full Legal Name *” value={parentName} onChange={e=>setParentName(e.target.value)} placeholder=“As it appears on a government ID”/>
<InpField label=“Parent / Guardian Email *” value={parentEmail} onChange={e=>setParentEmail(e.target.value)} placeholder=“your@email.com” type=“email”/>
<InpField label=“Parent / Guardian Mobile Phone *” value={parentPhone} onChange={e=>setParentPhone(e.target.value)} placeholder=”(555) 000-0000” type=“tel”/>
{parentEmail&&parentPhone&&(
<div style={{background:C.card,border:`2px solid ${C.border}`,borderRadius:12,padding:14,marginBottom:14}}>
<div style={{fontWeight:800,fontFamily:M,fontSize:11,marginBottom:6}}>📱 IDENTITY VERIFICATION (TEXT-PLUS METHOD)</div>
<div style={{fontSize:12,fontFamily:F,color:C.muted,marginBottom:10,lineHeight:1.5}}>In a live app, a code is sent to your phone. Demo code:</div>
<div style={{background:C.yellow,borderRadius:10,padding:“10px”,textAlign:“center”,marginBottom:10}}><div style={{fontSize:26,fontWeight:900,fontFamily:M,letterSpacing:6}}>{verifyCode}</div></div>
<InpField label=“Enter verification code” value={codeIn} onChange={e=>{setCodeIn(e.target.value);if(e.target.value===verifyCode)setVerified(true);}} placeholder=“6-digit code”/>
{verified&&<div style={{color:C.sage,fontFamily:M,fontSize:12,fontWeight:800}}>✓ Identity verified</div>}
</div>
)}
<div style={{background:C.card,border:`2px solid ${C.border}`,borderRadius:12,padding:14,marginBottom:14}}>
<CheckRow checked={pConsent} onChange={e=>setPConsent(e.target.checked)}>I confirm I am the legal parent/guardian. I have read and agree to Swap’s Terms and Privacy Policy on my child’s behalf.</CheckRow>
<CheckRow checked={pData} onChange={e=>setPData(e.target.checked)}>I understand Swap will collect my child’s first name, school name, clothing photos, and outfit posts for use within private Groups only. I am NOT consenting to third-party data sharing.</CheckRow>
{ageGroup===“13to17”&&<CheckRow checked={pPhoto} onChange={e=>setPPhoto(e.target.checked)}><span><strong>Tennessee Right of Publicity (T.C.A. § 47-25-1103):</strong> I consent to my child posting photos of themselves — including their face and outfit — on the private Style Feed (OOTD page), visible only to their invited Group members. I understand these photos are never public and cannot be shared outside the Group.</span></CheckRow>}
<CheckRow checked={pArb} onChange={e=>setPArb(e.target.checked)}>I have read Section 8 of the Terms (Mutual Arbitration). I understand both Swap and my child agree to binding arbitration. I understand the 30-day opt-out right.</CheckRow>
<CheckRow checked={pPrivacy} onChange={e=>setPPrivacy(e.target.checked)}>I understand my COPPA rights to review, correct, or delete my child’s data at any time: privacy@swapapp.com</CheckRow>
</div>
<InpField label=“Digital Signature — Type your full legal name *” value={parentSig} onChange={e=>setParentSig(e.target.value)} placeholder=“Type full legal name” style={{fontFamily:“cursive”,fontSize:18}}/>
<div style={{background:`${C.red}15`,border:`2px solid ${C.red}`,borderRadius:12,padding:12,marginBottom:16,fontSize:11,fontFamily:M,color:C.red,lineHeight:1.6}}>⚠️ LEGAL NOTICE: By signing, you agree on behalf of yourself and your minor child to the Terms of Service including the mutual binding arbitration clause (Section 8). Consent records are retained for 3 years per COPPA requirements.</div>
<Btn full onClick={()=>setStep(6)} disabled={!parentName||!parentEmail||!parentSig||!verified||!pConsent||!pArb||!pPrivacy||!pData||(ageGroup===“13to17”&&!pPhoto)}>✦ Submit Verified Parental Consent</Btn>
<div style={{textAlign:“center”,fontSize:10,color:C.muted,fontFamily:M,marginTop:10,lineHeight:1.6}}>Consent timestamp & verification will be logged.{”\n”}Confirmation sent to {parentEmail||“your email”}. Records kept 3 years per COPPA.</div>
</div>
</div>
);

if(step===6) return(
<div style={{background:C.bg,minHeight:“100vh”,padding:“32px 24px”}}>
<ProgressBar current={isMinor?6:5} total={total}/>
<div style={{fontSize:26,fontWeight:900,fontFamily:F,color:C.ink,marginBottom:6}}>{isMinor?“You’re approved! 🎉”:“Almost there! ✦”}<br/>Set up your profile.</div>
{isMinor&&<div style={{background:`${C.sage}20`,border:`2px solid ${C.sage}`,borderRadius:12,padding:12,marginBottom:18}}><div style={{color:C.sage,fontWeight:800,fontFamily:M,fontSize:11,marginBottom:3}}>✅ PARENTAL CONSENT VERIFIED</div><div style={{color:C.muted,fontSize:12,fontFamily:F}}>Consent from {parentName||“your parent”} logged. Confirmation sent to {parentEmail||“their email”}.</div></div>}
<InpField label=“Your first name” value={name} onChange={e=>setName(e.target.value)} placeholder=“What should friends call you?”/>
<InpField label=“Your school” value={school} onChange={e=>setSchool(e.target.value)} placeholder=“School name”/>
<div style={{marginBottom:20}}><div style={{fontSize:10,fontFamily:M,color:C.muted,letterSpacing:.8,textTransform:“uppercase”,marginBottom:8}}>Choose your vibe</div><div style={{display:“flex”,flexWrap:“wrap”,gap:8}}>{emojis.map(e=><button key={e} onClick={()=>setEmoji(e)} style={{fontSize:26,background:emoji===e?C.yellow:C.border,border:`2px solid ${emoji===e?C.ink:"transparent"}`,borderRadius:10,padding:“6px 10px”,cursor:“pointer”}}>{e}</button>)}</div></div>
<Btn full onClick={()=>name&&school&&setStep(7)} disabled={!name||!school}>Enter Swap ✦</Btn>
</div>
);

if(step===7) return(
<div style={{background:C.ink,minHeight:“100vh”,display:“flex”,flexDirection:“column”,alignItems:“center”,justifyContent:“center”,padding:“40px 28px”,textAlign:“center”}}>
<div style={{fontSize:80,marginBottom:16}}>{emoji}</div>
<div style={{fontSize:30,fontWeight:900,color:C.yellow,fontFamily:F,marginBottom:6}}>Welcome, {name}! 🎉</div>
<div style={{color:C.muted,fontSize:11,fontFamily:M,letterSpacing:3,textTransform:“uppercase”,marginBottom:28}}>✦ share the vibe</div>
<div style={{background:“rgba(255,255,255,.06)”,border:“1px solid rgba(255,255,255,.1)”,borderRadius:16,padding:18,width:“100%”,marginBottom:28,textAlign:“left”}}>
{[“✅ Safety Guidelines accepted”,“✅ Privacy Policy accepted”,“✅ Terms of Service accepted”,“✅ Arbitration clause acknowledged”,isMinor?`✅ Parental consent from ${parentName} verified`:null,isMinor?“✅ COPPA data disclosure accepted”:null].filter(Boolean).map((l,i)=><div key={i} style={{color:C.sage,fontSize:12,fontFamily:M,marginBottom:6}}>{l}</div>)}
</div>
<Btn full onClick={onComplete} style={{fontSize:16,padding:“16px”}}>✦ Start Swapping</Btn>
</div>
);
return null;
}

// ═══════════════════════════════════════════════════════════════════
// ITEM CARD & MODAL
// ═══════════════════════════════════════════════════════════════════
function ItemCard({item,onSelect,compact=false}) {
const [liked,setLiked]=useState(false);
const heat=heatLabel(feedScore(item,ME.tags,ME.size));
const hoursLeft=item.expiresAt?(item.expiresAt-NOW)/HOUR:999;
const urgent=hoursLeft<6&&item.expiresAt;
const isMatch=ME.tags.some(t=>t.toLowerCase()===item.tag.toLowerCase());
const returnPrefColor=item.returnPref===“unlaundered”?C.peach:C.sage;
const returnPrefLabel=item.returnPref===“unlaundered”?“👗 Return unlaundered OK”:“🧺 Return clean please”;
return(
<div onClick={()=>onSelect&&onSelect(item)} style={{background:C.card,borderRadius:compact?14:18,overflow:“hidden”,border:`2px solid ${isMatch?C.lavender:C.border}`,cursor:“pointer”,boxShadow:isMatch?“0 0 0 2px rgba(199,125,255,.18)”:“0 2px 10px rgba(26,26,46,.06)”}}>
{/* LARGE PORTRAIT PHOTO — full clothing showcase */}
<div style={{position:“relative”,background:`linear-gradient(135deg,${item.color}28,${item.color}55)`,paddingTop:“140%”,overflow:“hidden”}}>
{item.photo
?<img src={item.photo} alt={item.item} style={{position:“absolute”,inset:0,width:“100%”,height:“100%”,objectFit:“cover”}}/>
:<div style={{position:“absolute”,inset:0,display:“flex”,alignItems:“center”,justifyContent:“center”,fontSize:compact?52:64}}>{item.emoji}</div>}
<div style={{position:“absolute”,top:7,left:7,background:heat.color,color:“white”,fontSize:8,fontWeight:800,padding:“2px 6px”,borderRadius:6,fontFamily:M}}>{heat.label}</div>
{isMatch&&<div style={{position:“absolute”,top:7,right:7,background:C.lavender,color:“white”,fontSize:8,fontWeight:800,padding:“2px 6px”,borderRadius:6,fontFamily:M}}>✦ Your Style</div>}
{item.interested>0&&<div style={{position:“absolute”,bottom:32,left:7,background:“rgba(26,26,46,.75)”,color:C.yellow,fontSize:8,fontWeight:800,padding:“2px 7px”,borderRadius:6,fontFamily:M}}>🔥{item.interested} want this</div>}
{urgent&&<div style={{position:“absolute”,top:compact?7:28,right:7,background:C.red,color:“white”,fontSize:8,fontWeight:800,padding:“2px 6px”,borderRadius:6,fontFamily:M}}>⏱{Math.round(hoursLeft)}h</div>}
{item.status===“borrowed”&&<div style={{position:“absolute”,top:compact?7:30,left:compact?7:42,background:C.coral,color:“white”,fontSize:8,fontWeight:800,padding:“2px 6px”,borderRadius:6,fontFamily:M}}>OUT</div>}
<button onClick={e=>{e.stopPropagation();setLiked(l=>!l);}} style={{position:“absolute”,bottom:7,right:8,background:“none”,border:“none”,fontSize:18,cursor:“pointer”,padding:0}}>{liked?“❤️”:“🤍”}</button>
{/* Return pref badge at bottom */}
<div style={{position:“absolute”,bottom:7,left:7,background:`${returnPrefColor}ee`,borderRadius:8,padding:“2px 7px”}}>
<span style={{fontSize:8,fontWeight:800,fontFamily:M,color:“white”}}>{returnPrefLabel}</span>
</div>
</div>
<div style={{padding:compact?“7px 9px 8px”:“9px 11px 11px”}}>
<div style={{fontWeight:800,fontSize:compact?11:12,color:C.ink,fontFamily:F,overflow:“hidden”,textOverflow:“ellipsis”,whiteSpace:“nowrap”}}>{item.item}</div>
<div style={{fontSize:9,color:C.muted,fontFamily:M,marginTop:1}}>{item.owner} {item.ownerEmoji} · {item.size} · ↩{item.returnDays}d</div>
<div style={{display:“flex”,gap:6,marginTop:compact?4:6,flexWrap:“wrap”}}>
<Badge color={item.color}>#{item.tag}</Badge>
{item.reserves>0&&<Badge color={C.amber}>📌{item.reserves}</Badge>}
</div>
</div>
</div>
);
}

function ItemModal({item,onClose}) {
const [requested,setRequested]=useState(false);
const [reserved,setReserved]=useState(false);
const heat=heatLabel(feedScore(item,ME.tags,ME.size));
const hoursLeft=item.expiresAt?Math.max(0,(item.expiresAt-NOW)/HOUR):null;
return(
<div style={{position:“fixed”,inset:0,background:“rgba(26,26,46,.7)”,zIndex:500,display:“flex”,alignItems:“flex-end”,maxWidth:430,left:“50%”,transform:“translateX(-50%)”}} onClick={onClose}>
<div style={{background:C.bg,borderRadius:“24px 24px 0 0”,width:“100%”,maxHeight:“90vh”,overflowY:“auto”}} onClick={e=>e.stopPropagation()}>
{/* Large portrait hero */}
<div style={{position:“relative”,background:`linear-gradient(135deg,${item.color}40,${item.color}80)`,paddingTop:“70%”,borderRadius:“22px 22px 0 0”,overflow:“hidden”}}>
{item.photo?<img src={item.photo} alt={item.item} style={{position:“absolute”,inset:0,width:“100%”,height:“100%”,objectFit:“cover”}}/>:<div style={{position:“absolute”,inset:0,display:“flex”,alignItems:“center”,justifyContent:“center”,fontSize:90}}>{item.emoji}</div>}
<button onClick={onClose} style={{position:“absolute”,top:14,right:14,background:“rgba(26,26,46,.45)”,border:“none”,borderRadius:“50%”,width:30,height:30,cursor:“pointer”,color:“white”,fontSize:14,display:“flex”,alignItems:“center”,justifyContent:“center”}}>✕</button>
<div style={{position:“absolute”,top:14,left:14,background:heat.color,color:“white”,fontSize:10,fontWeight:800,padding:“3px 9px”,borderRadius:8,fontFamily:M}}>{heat.label}</div>
</div>
<div style={{padding:20}}>
<div style={{fontSize:22,fontWeight:900,color:C.ink,fontFamily:F}}>{item.item}</div>
<div style={{fontSize:12,color:C.muted,fontFamily:M,marginBottom:12}}>{item.owner} {item.ownerEmoji} · Size {item.size} · ❤️{item.likes} · 👁{item.views}</div>
{(item.interested>0||hoursLeft!==null)&&<div style={{background:`${C.coral}12`,border:`2px solid ${C.coral}40`,borderRadius:14,padding:14,marginBottom:14}}>
<div style={{fontWeight:800,fontFamily:M,fontSize:11,color:C.coral,marginBottom:6}}>⚡ LIVE ACTIVITY</div>
{item.interested>0&&<div style={{fontSize:12,fontFamily:F,color:C.ink,marginBottom:4}}>🔥 <strong>{item.interested} people</strong> interested right now</div>}
{hoursLeft!==null&&<div style={{fontSize:12,fontFamily:F,color:C.ink}}>⏳ Offer expires in: <strong style={{color:hoursLeft<2?C.red:C.amber}}>{Math.round(hoursLeft)}h</strong></div>}
</div>}
<div style={{background:C.card,border:`2px solid ${C.border}`,borderRadius:12,padding:14,marginBottom:12,fontSize:13,fontFamily:F,lineHeight:1.6}}>”{item.desc}”</div>
{/* Return window */}
<div style={{background:`${C.sky}18`,border:`2px solid ${C.sky}40`,borderRadius:12,padding:12,marginBottom:10}}>
<div style={{fontSize:11,fontWeight:800,fontFamily:M,color:C.sky,marginBottom:2}}>↩ Return Window</div>
<div style={{fontSize:12,fontFamily:F,color:C.ink}}>Return within <strong>{item.returnDays} days</strong></div>
</div>
{/* Return preference */}
<div style={{background:item.returnPref===“unlaundered”?`${C.peach}35`:`${C.sage}18`,border:`2px solid ${item.returnPref==="unlaundered"?C.peach:C.sage}`,borderRadius:12,padding:12,marginBottom:14}}>
<div style={{fontSize:11,fontWeight:800,fontFamily:M,color:item.returnPref===“unlaundered”?C.ink:C.sage,marginBottom:2}}>{item.returnPref===“unlaundered”?“👗 Return Preference”:“🧺 Return Preference”}</div>
<div style={{fontSize:12,fontFamily:F,color:C.ink}}>{item.returnPref===“unlaundered”?`${item.owner} says unlaundered is fine — they'll wash it themselves!`:`${item.owner} asks you to return this freshly washed and folded.`}</div>
</div>
<div style={{background:C.yellow,border:`2px solid ${C.ink}`,borderRadius:12,padding:11,marginBottom:16,fontSize:11,fontFamily:M,lineHeight:1.6}}>⚠️ By requesting, you agree to return this item per the owner’s preference and within {item.returnDays} days. Exchange in person only — school, bus, or a Group friend’s home when you’re already together.</div>
<div style={{display:“flex”,gap:8}}>
{item.status===“available”?<Btn full onClick={()=>setRequested(true)} disabled={requested} variant={requested?“success”:“primary”}>{requested?“✓ Requested!”:“✦ Request Borrow”}</Btn>:<Btn full onClick={()=>setReserved(!reserved)} variant={reserved?“success”:“coral”}>{reserved?“✓ In Queue”:“📌 Join Reserve Queue”}</Btn>}
</div>
</div>
</div>
</div>
);
}

// ═══════════════════════════════════════════════════════════════════
// OOTD / STYLE FEED — full capability with face toggle
// ═══════════════════════════════════════════════════════════════════
function StyleFeed({userAge=“13to17”}) {
const [posts,setPosts]=useState(INIT_OOTDS);
const [liked,setLiked]=useState([]);
const [open,setOpen]=useState(false);
const [cap,setCap]=useState(””);
const [photo,setPhoto]=useState(null);
const [showsFace,setShowsFace]=useState(null);
const [faceBlocked,setFaceBlocked]=useState(false);
const [showFeedback,setShowFeedback]=useState(false);
const isUnder13=userAge===“under13”;
const canPost=(cap||photo)&&!faceBlocked&&(photo===null||showsFace!==null);
const handleFaceToggle=(ans)=>{setShowsFace(ans);if(ans&&isUnder13){setFaceBlocked(true);setPhoto(null);}else setFaceBlocked(false);};
const submit=()=>{if(!canPost)return;setPosts(p=>[{id:Date.now(),userId:“u1”,user:“You ✨”,text:cap||“📸 New OOTD!”,likes:0,time:“just now”,color:C.softYellow,photo,showsFace},…p]);setCap(””);setPhoto(null);setShowsFace(null);setFaceBlocked(false);setOpen(false);setShowFeedback(true);};
return(
<div style={{padding:“12px 16px 0”}}>
{showFeedback&&<PostFeedback onDismiss={()=>setShowFeedback(false)}/>}
{/* Post CTA */}
<div onClick={()=>setOpen(true)} style={{background:C.ink,borderRadius:14,padding:13,display:“flex”,alignItems:“center”,gap:12,marginBottom:14,cursor:“pointer”}}>
<div style={{background:C.yellow,borderRadius:“50%”,width:40,height:40,display:“flex”,alignItems:“center”,justifyContent:“center”,fontSize:18,flexShrink:0}}>📸</div>
<div><div style={{color:C.yellow,fontWeight:800,fontSize:13,fontFamily:M}}>Post your OOTD</div><div style={{color:C.muted,fontSize:11,fontFamily:F}}>Show off what you swapped today!</div></div>
<div style={{marginLeft:“auto”,color:C.yellow,fontSize:20}}>+</div>
</div>
{open&&(
<div style={{background:C.card,border:`2px solid ${C.ink}`,borderRadius:16,padding:16,marginBottom:14}}>
<div style={{fontWeight:800,fontFamily:M,fontSize:13,marginBottom:12}}>Share your look ✨</div>
{/* Photo area — portrait format */}
{photo?(
<div style={{position:“relative”,marginBottom:12,paddingTop:“125%”,borderRadius:14,overflow:“hidden”,border:`2px solid ${C.border}`}}>
<img src={photo} alt=“OOTD” style={{position:“absolute”,inset:0,width:“100%”,height:“100%”,objectFit:“cover”}}/>
<button onClick={()=>{setPhoto(null);setShowsFace(null);setFaceBlocked(false);}} style={{position:“absolute”,top:8,right:8,background:“rgba(0,0,0,.5)”,border:“none”,borderRadius:“50%”,width:26,height:26,color:“white”,cursor:“pointer”,fontSize:13}}>✕</button>
</div>
):(
<div onClick={()=>document.getElementById(“ootd-file”).click()} style={{border:`2px dashed ${C.border}`,borderRadius:12,paddingTop:“80%”,position:“relative”,cursor:“pointer”,marginBottom:12,background:C.bg}}>
<div style={{position:“absolute”,inset:0,display:“flex”,flexDirection:“column”,alignItems:“center”,justifyContent:“center”,gap:6}}>
<span style={{fontSize:32}}>📷</span>
<span style={{fontSize:12,color:C.muted,fontFamily:F}}>Add outfit photo (optional)</span>
<span style={{fontSize:10,color:C.border,fontFamily:M}}>Portrait format recommended</span>
</div>
<input id=“ootd-file” type=“file” accept=“image/*” style={{display:“none”}} onChange={e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>setPhoto(ev.target.result);r.readAsDataURL(f);}}/>
</div>
)}
{/* Face toggle */}
{photo&&(
<div style={{marginBottom:12}}>
<div style={{fontSize:10,fontFamily:M,fontWeight:800,color:C.ink,letterSpacing:.5,marginBottom:8,textTransform:“uppercase”}}>Does this photo show your face?</div>
<div style={{display:“flex”,gap:8}}>
{[{val:false,label:“No — outfit only 👗”,bg:showsFace===false?C.sage:C.border,col:showsFace===false?“white”:C.ink},{val:true,label:“Yes — face shown 😊”,bg:showsFace===true?(isUnder13?C.red:C.sky):C.border,col:showsFace===true?“white”:C.ink}].map(opt=>(
<button key={String(opt.val)} onClick={()=>handleFaceToggle(opt.val)} style={{flex:1,background:opt.bg,color:opt.col,border:`2px solid ${opt.bg===C.border?C.border:opt.bg}`,borderRadius:10,padding:“9px 6px”,cursor:“pointer”,fontFamily:M,fontWeight:800,fontSize:10}}>{opt.label}</button>
))}
</div>
{showsFace&&isUnder13&&<div style={{background:`${C.red}15`,border:`2px solid ${C.red}`,borderRadius:10,padding:10,marginTop:8,fontSize:11,fontFamily:F,color:C.red,lineHeight:1.5}}>🚫 Face photos aren’t allowed for users under 13 (COPPA). Lay your outfit flat and photo that instead!</div>}
{showsFace===true&&!isUnder13&&<div style={{background:`${C.sky}15`,border:`2px solid ${C.sky}`,borderRadius:10,padding:10,marginTop:8,fontSize:11,fontFamily:F,color:C.ink,lineHeight:1.5}}>ℹ️ Face photos are allowed for users 13+. By posting, you confirm your parent’s consent (on file) covers this per Tennessee Right of Publicity law. Visible to your Group members only.</div>}
{showsFace===false&&<div style={{background:`${C.sage}15`,border:`2px solid ${C.sage}`,borderRadius:10,padding:8,marginTop:8,fontSize:11,fontFamily:M,color:C.sage}}>✓ Outfit-only photos are always welcome!</div>}
</div>
)}
<textarea value={cap} onChange={e=>setCap(e.target.value)} placeholder=“What are you wearing? Tag the item you swapped!” style={{width:“100%”,height:65,borderRadius:10,border:`2px solid ${C.border}`,padding:10,fontSize:13,fontFamily:F,resize:“none”,outline:“none”,boxSizing:“border-box”,marginBottom:10}}/>
<div style={{display:“flex”,gap:8}}>
<Btn small onClick={submit} disabled={!canPost}>Post 🔥</Btn>
<Btn small variant=“secondary” onClick={()=>{setOpen(false);setPhoto(null);setShowsFace(null);setFaceBlocked(false);}}>Cancel</Btn>
</div>
</div>
)}
{posts.map(p=>(
<div key={p.id} style={{background:p.color||C.softYellow,border:`2px solid ${C.border}`,borderRadius:16,marginBottom:14,overflow:“hidden”}}>
{p.photo&&(
<div style={{position:“relative”,paddingTop:“125%”,overflow:“hidden”}}>
<img src={p.photo} alt=“OOTD” style={{position:“absolute”,inset:0,width:“100%”,height:“100%”,objectFit:“cover”}}/>
{p.showsFace===false&&<div style={{position:“absolute”,bottom:8,left:8,background:“rgba(0,0,0,.55)”,borderRadius:8,padding:“3px 10px”}}><span style={{color:“white”,fontSize:10,fontFamily:M}}>👗 outfit only</span></div>}
</div>
)}
<div style={{padding:14}}>
<div style={{fontWeight:800,fontSize:14,color:C.ink,fontFamily:F,marginBottom:4}}>{p.user} <span style={{fontSize:10,color:C.muted,fontFamily:M,fontWeight:400}}>{p.time}</span></div>
<div style={{fontSize:13,color:C.ink,fontFamily:F,lineHeight:1.6,marginBottom:10}}>{p.text}</div>
<div style={{display:“flex”,justifyContent:“space-between”,alignItems:“center”}}>
<Badge color={C.muted}>#swapstyle</Badge>
<button onClick={()=>setLiked(l=>l.includes(p.id)?l.filter(x=>x!==p.id):[…l,p.id])} style={{background:“none”,border:“none”,cursor:“pointer”,fontFamily:M,fontSize:13,fontWeight:700,color:C.muted}}>{liked.includes(p.id)?“❤️”:“🤍”} {p.likes+(liked.includes(p.id)?1:0)}</button>
</div>
</div>
</div>
))}
</div>
);
}

// ═══════════════════════════════════════════════════════════════════
// MY CLOSET — with IM chat tab
// ═══════════════════════════════════════════════════════════════════
function MyCloset({onItemSelect,onBack,groups}) {
const [items,setItems]=useState(INIT_ITEMS.filter(i=>i.ownerId===“u1”));
const [addOpen,setAddOpen]=useState(false);
const [closetTab,setClosetTab]=useState(“items”); // items | messages
const [dmThreads,setDmThreads]=useState(INIT_DM_THREADS);
const [activeDM,setActiveDM]=useState(null);
const [msg,setMsg]=useState(””);
const chatEndRef=useRef(null);
const [n,setN]=useState({name:””,size:“M”,tag:””,emoji:“👗”,photo:null,returnDays:5,returnPref:“clean”});
const emojis=[“👗”,“🧥”,“👜”,“👟”,“🎩”,“🧤”,“🌷”,“💫”,“🎸”,“✨”,“🧣”,“🩱”];

// All unique members across all my groups (excluding me)
const allGroupMembers=[…new Map(
groups.flatMap(g=>g.members).filter(uid=>uid!==ME.id).map(uid=>[uid,ALL_USERS.find(u=>u.id===uid)]).filter(([,u])=>u)
).values()];

const addItem=()=>{if(!n.name)return;setItems(prev=>[{id:Date.now(),ownerId:“u1”,item:n.name,size:n.size,tag:n.tag||“swap”,emoji:n.emoji,photo:n.photo,owner:“Emma”,ownerEmoji:“✨”,color:C.lavender,status:“available”,likes:0,reserves:0,views:0,addedAt:NOW,desc:“Just added!”,returnDays:n.returnDays,returnPref:n.returnPref,expiresAt:NOW+24*HOUR,interested:0},…prev]);setN({name:””,size:“M”,tag:””,emoji:“👗”,photo:null,returnDays:5,returnPref:“clean”});setAddOpen(false);};
const totalLikes=items.reduce((s,i)=>s+i.likes,0);
const totalViews=items.reduce((s,i)=>s+i.views,0);
const unreadDMs=allGroupMembers.filter(u=>u.id===“u2”).length; // sim

const sendDM=(uid)=>{if(!msg.trim())return;setDmThreads(prev=>({…prev,[uid]:[…(prev[uid]||[]),{id:Date.now(),from:“u1”,text:msg,time:“now”}]}));setMsg(””);setTimeout(()=>chatEndRef.current?.scrollIntoView({behavior:“smooth”}),50);};

return(
<div>
{/* Profile header */}
<div style={{background:C.ink,padding:“24px 20px 20px”}}>
{onBack&&<button onClick={onBack} style={{background:“none”,border:“none”,color:C.muted,fontSize:20,cursor:“pointer”,marginBottom:12,display:“block”}}>←</button>}
<div style={{display:“flex”,alignItems:“center”,gap:14,marginBottom:16}}>
<div style={{width:56,height:56,borderRadius:“50%”,background:C.yellow,display:“flex”,alignItems:“center”,justifyContent:“center”,fontSize:26}}>✨</div>
<div><div style={{color:“white”,fontWeight:900,fontSize:20,fontFamily:F}}>Emma’s Closet</div><div style={{color:C.muted,fontSize:11,fontFamily:M}}>{items.length} items · 7🔥 streak</div><div style={{display:“flex”,gap:5,marginTop:5}}>{ME.tags.map(t=><span key={t} style={{background:`${C.yellow}25`,color:C.yellow,fontSize:9,fontWeight:800,padding:“2px 8px”,borderRadius:10,fontFamily:M}}>{t}</span>)}</div></div>
</div>
<div style={{display:“grid”,gridTemplateColumns:“1fr 1fr 1fr 1fr”,gap:6,textAlign:“center”}}>
{[{l:“❤️”,v:totalLikes,c:C.coral},{l:“👁”,v:totalViews,c:C.sky},{l:“📌”,v:items.reduce((s,i)=>s+i.reserves,0),c:C.amber},{l:“👥”,v:34,c:C.sage}].map((s,i)=>(
<div key={i} style={{background:“rgba(255,255,255,.08)”,borderRadius:10,padding:“9px 4px”}}><div style={{fontSize:15,fontWeight:900,color:s.c,fontFamily:M}}>{s.v}</div><div style={{fontSize:9,color:C.muted,fontFamily:M}}>{s.l}</div></div>
))}
</div>
</div>

```
  {/* Sub-nav: items | messages */}
  <div style={{display:"flex",background:C.card,borderBottom:`2px solid ${C.border}`}}>
    {[{id:"items",label:"👗 My Closet"},{id:"messages",label:`💬 Messages${unreadDMs>0?" 🔴":""}`}].map(v=>(
      <button key={v.id} onClick={()=>{setClosetTab(v.id);setActiveDM(null);}} style={{flex:1,background:"none",border:"none",padding:"12px 4px",cursor:"pointer",fontFamily:M,fontWeight:800,fontSize:11,color:closetTab===v.id?C.ink:C.muted,borderBottom:closetTab===v.id?`3px solid ${C.ink}`:"3px solid transparent"}}>
        {v.label}
      </button>
    ))}
  </div>

  {/* ── ITEMS TAB ── */}
  {closetTab==="items"&&(
    <div style={{padding:"16px 16px 0"}}>
      <button onClick={()=>setAddOpen(true)} style={{width:"100%",background:C.yellow,border:`2px solid ${C.ink}`,borderRadius:14,padding:"13px",fontSize:14,fontWeight:800,cursor:"pointer",fontFamily:M,marginBottom:16,display:"flex",alignItems:"center",justifyContent:"center",gap:10,color:C.ink}}>
        <span style={{fontSize:20}}>📷</span> Add Item to Your Closet
      </button>
      {addOpen&&(
        <div style={{background:C.card,border:`2px solid ${C.ink}`,borderRadius:16,padding:18,marginBottom:16}}>
          <div style={{fontWeight:800,fontFamily:M,fontSize:13,marginBottom:12}}>New Closet Item 📸</div>
          {n.photo?(
            <div style={{position:"relative",paddingTop:"140%",borderRadius:14,overflow:"hidden",border:`2px solid ${C.border}`,marginBottom:12}}>
              <img src={n.photo} alt="item" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"}}/>
              <button onClick={()=>setN(x=>({...x,photo:null}))} style={{position:"absolute",top:8,right:8,background:"rgba(0,0,0,.5)",border:"none",borderRadius:"50%",width:26,height:26,color:"white",cursor:"pointer",fontSize:13}}>✕</button>
            </div>
          ):(
            <div style={{border:`2px dashed ${C.border}`,borderRadius:12,paddingTop:"100%",position:"relative",cursor:"pointer",marginBottom:12,background:C.bg}}>
              <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:6}}>
                <span style={{fontSize:28}}>📷</span>
                <span style={{fontSize:12,color:C.muted,fontFamily:F}}>Take or upload clothing photo</span>
                <span style={{fontSize:10,color:C.border,fontFamily:M}}>Portrait format — show the full item</span>
                <div style={{display:"flex",gap:10,marginTop:6}}>
                  <button onClick={e=>{e.stopPropagation();document.getElementById("closet-cam").click();}} style={{background:C.ink,color:C.yellow,border:"none",borderRadius:10,padding:"6px 14px",cursor:"pointer",fontFamily:M,fontWeight:800,fontSize:11}}>📷 Camera</button>
                  <button onClick={e=>{e.stopPropagation();document.getElementById("closet-file").click();}} style={{background:"transparent",color:C.ink,border:`2px solid ${C.ink}`,borderRadius:10,padding:"6px 14px",cursor:"pointer",fontFamily:M,fontWeight:800,fontSize:11}}>🖼️ Gallery</button>
                </div>
              </div>
              <input id="closet-cam"  type="file" accept="image/*" capture="environment" style={{display:"none"}} onChange={e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>setN(x=>({...x,photo:ev.target.result}));r.readAsDataURL(f);}}/>
              <input id="closet-file" type="file" accept="image/*" style={{display:"none"}} onChange={e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>setN(x=>({...x,photo:ev.target.result}));r.readAsDataURL(f);}}/>
            </div>
          )}
          <div style={{background:`${C.coral}15`,border:`2px solid ${C.coral}`,borderRadius:10,padding:10,marginBottom:12,fontSize:11,fontFamily:M,color:C.coral,lineHeight:1.5}}>📸 Clothing items only — no people, faces, or locations. Visible to your Group members only.</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:10}}>{emojis.map(e=><button key={e} onClick={()=>setN(x=>({...x,emoji:e}))} style={{fontSize:20,background:n.emoji===e?C.yellow:C.border,border:`2px solid ${n.emoji===e?C.ink:"transparent"}`,borderRadius:8,padding:"4px 7px",cursor:"pointer"}}>{e}</button>)}</div>
          <input value={n.name} onChange={e=>setN(x=>({...x,name:e.target.value}))} placeholder="Item name *" style={{width:"100%",padding:"11px 13px",borderRadius:11,border:`2px solid ${n.name?C.ink:C.border}`,fontSize:13,fontFamily:F,background:C.bg,outline:"none",boxSizing:"border-box",marginBottom:8}}/>
          <div style={{display:"flex",gap:8,marginBottom:12}}>
            <input value={n.tag} onChange={e=>setN(x=>({...x,tag:e.target.value}))} placeholder="Style tag…" style={{flex:1,padding:"11px 12px",borderRadius:11,border:`2px solid ${C.border}`,fontSize:13,fontFamily:F,background:C.bg,outline:"none"}}/>
            <select value={n.size} onChange={e=>setN(x=>({...x,size:e.target.value}))} style={{padding:"11px 8px",borderRadius:11,border:`2px solid ${C.border}`,fontSize:13,fontFamily:F,outline:"none",background:"white"}}>{["XS","S","M","L","XL","OS"].map(s=><option key={s}>{s}</option>)}</select>
          </div>
          <div style={{marginBottom:12}}>
            <div style={{fontSize:10,fontFamily:M,color:C.muted,letterSpacing:.8,textTransform:"uppercase",marginBottom:7}}>Return within (days)</div>
            <div style={{display:"flex",gap:6}}>{[3,5,7,10,14].map(d=><button key={d} onClick={()=>setN(x=>({...x,returnDays:d}))} style={{flex:1,background:n.returnDays===d?C.ink:C.border,color:n.returnDays===d?C.yellow:C.ink,border:`2px solid ${n.returnDays===d?C.ink:C.border}`,borderRadius:10,padding:"8px 4px",cursor:"pointer",fontFamily:M,fontWeight:800,fontSize:11}}>{d}d</button>)}</div>
          </div>
          <div style={{marginBottom:14}}>
            <div style={{fontSize:10,fontFamily:M,color:C.muted,letterSpacing:.8,textTransform:"uppercase",marginBottom:8}}>Return preference</div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {[{val:"clean",label:"🧺 Return clean & washed",sub:"Freshly laundered before returning",bg:`${C.sage}20`,border:C.sage},{val:"unlaundered",label:"👗 Unlaundered is fine",sub:"No need to wash — I'll launder it myself",bg:`${C.peach}40`,border:C.peach}].map(opt=>(
                <button key={opt.val} onClick={()=>setN(x=>({...x,returnPref:opt.val}))} style={{background:n.returnPref===opt.val?opt.bg:"transparent",border:`2px solid ${n.returnPref===opt.val?opt.border:C.border}`,borderRadius:12,padding:"10px 14px",cursor:"pointer",textAlign:"left",display:"flex",flexDirection:"column",gap:2}}>
                  <div style={{fontFamily:M,fontWeight:800,fontSize:12,color:C.ink}}>{opt.label}</div>
                  <div style={{fontFamily:F,fontSize:10,color:C.muted}}>{opt.sub}</div>
                </button>
              ))}
            </div>
          </div>
          <div style={{display:"flex",gap:8}}><Btn onClick={addItem} disabled={!n.name} style={{flex:1}}>Add ✦</Btn><Btn variant="secondary" onClick={()=>setAddOpen(false)}>Cancel</Btn></div>
        </div>
      )}
      <div style={{fontSize:10,color:C.muted,fontFamily:M,letterSpacing:.8,textTransform:"uppercase",marginBottom:10}}>My Items ({items.length})</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        {items.map(item=><ItemCard key={item.id} item={item} onSelect={onItemSelect}/>)}
      </div>
      <div style={{height:20}}/>
    </div>
  )}

  {/* ── MESSAGES TAB ── */}
  {closetTab==="messages"&&!activeDM&&(
    <div style={{padding:"16px 16px 0",overflowY:"auto"}}>
      <div style={{fontSize:10,color:C.muted,fontFamily:M,letterSpacing:.8,textTransform:"uppercase",marginBottom:12}}>Direct Messages — Across All Your Groups</div>
      {allGroupMembers.length===0&&<div style={{textAlign:"center",padding:40,color:C.muted,fontFamily:F}}><div style={{fontSize:36,marginBottom:8}}>💬</div>Join a group to start messaging friends!</div>}
      {allGroupMembers.map(u=>{
        const thread=dmThreads[u.id]||[];
        const last=thread[thread.length-1];
        const unread=u.id==="u2"; // sim
        // Which groups do we share?
        const shared=groups.filter(g=>g.members.includes(ME.id)&&g.members.includes(u.id));
        return(
          <div key={u.id} onClick={()=>setActiveDM(u.id)} style={{background:C.card,border:`2px solid ${unread?C.sky:C.border}`,borderRadius:14,padding:14,marginBottom:10,display:"flex",alignItems:"center",gap:12,cursor:"pointer"}}>
            <div style={{position:"relative"}}>
              <div style={{width:46,height:46,borderRadius:"50%",background:`${C.yellow}35`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>{u.emoji}</div>
              {unread&&<div style={{position:"absolute",top:0,right:0,width:10,height:10,background:C.coral,borderRadius:"50%",border:`2px solid ${C.bg}`}}/>}
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontWeight:800,fontSize:14,fontFamily:F,color:C.ink}}>{u.name} {u.emoji}</div>
              <div style={{fontSize:9,color:C.lavender,fontFamily:M,marginBottom:3}}>{shared.map(g=>g.name).join(", ")}</div>
              {last?<div style={{fontSize:11,color:C.muted,fontFamily:F,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{last.from==="u1"?"You: ":""}{last.text}</div>:<div style={{fontSize:11,color:C.muted,fontFamily:F,fontStyle:"italic"}}>Say hi! 👋</div>}
            </div>
            <div style={{fontSize:10,color:C.muted,fontFamily:M,flexShrink:0}}>{last?.time||""}</div>
          </div>
        );
      })}
    </div>
  )}

  {/* Active DM thread from closet */}
  {closetTab==="messages"&&activeDM&&(()=>{
    const peer=ALL_USERS.find(u=>u.id===activeDM);
    const thread=dmThreads[activeDM]||[];
    const shared=groups.filter(g=>g.members.includes(ME.id)&&g.members.includes(activeDM));
    return(
      <div style={{display:"flex",flexDirection:"column",height:"calc(100vh - 200px)"}}>
        <div style={{padding:"10px 16px 10px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:10,background:C.bg}}>
          <button onClick={()=>setActiveDM(null)} style={{background:"none",border:"none",fontSize:18,cursor:"pointer",color:C.muted}}>←</button>
          <div style={{width:36,height:36,borderRadius:"50%",background:`${C.yellow}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{peer?.emoji}</div>
          <div>
            <div style={{fontWeight:800,fontSize:14,fontFamily:F,color:C.ink}}>{peer?.name} {peer?.emoji}</div>
            <div style={{fontSize:10,color:C.lavender,fontFamily:M}}>{shared.map(g=>g.emoji+" "+g.name).join(" · ")}</div>
          </div>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"12px 16px",display:"flex",flexDirection:"column",gap:10}}>
          {thread.map((m,i)=>{
            const isMe=m.from==="u1";
            return(
              <div key={m.id||i} style={{display:"flex",justifyContent:isMe?"flex-end":"flex-start"}}>
                <div style={{background:isMe?C.ink:`${C.border}80`,color:isMe?C.yellow:C.ink,borderRadius:isMe?"16px 16px 4px 16px":"16px 16px 16px 4px",padding:"10px 14px",maxWidth:"75%"}}>
                  <div style={{fontSize:13,fontFamily:F,lineHeight:1.5}}>{m.text}</div>
                  <div style={{fontSize:9,color:isMe?"rgba(255,255,255,.4)":C.muted,fontFamily:M,marginTop:4,textAlign:"right"}}>{m.time}</div>
                </div>
              </div>
            );
          })}
          <div ref={chatEndRef}/>
        </div>
        <div style={{padding:"10px 16px 16px",borderTop:`2px solid ${C.border}`,background:C.bg}}>
          <div style={{display:"flex",gap:8}}>
            <input value={msg} onChange={e=>setMsg(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendDM(activeDM);}}} placeholder={`Message ${peer?.name}…`} style={{flex:1,padding:"10px 14px",borderRadius:22,border:`2px solid ${C.border}`,fontSize:13,fontFamily:F,outline:"none",background:C.card}}/>
            <button onClick={()=>sendDM(activeDM)} style={{background:C.ink,border:"none",borderRadius:"50%",width:44,height:44,cursor:"pointer",color:C.yellow,fontSize:18,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>→</button>
          </div>
        </div>
      </div>
    );
  })()}
</div>
```

);
}

// ═══════════════════════════════════════════════════════════════════
// HOME FEED — access-enforced: only shows items from user’s groups
// ═══════════════════════════════════════════════════════════════════
function HomeFeed({groups,onGroupSelect,onItemSelect,onOpenMyCloset,onJoinByCode}) {
const [view,setView]=useState(“groups”);
const [joinInput,setJoinInput]=useState(””);
const [joinError,setJoinError]=useState(””);
const myItems=INIT_ITEMS.filter(i=>i.ownerId===ME.id);

// ENFORCE: only items accessible through user’s groups
const accessibleItems = getAccessibleItems(INIT_ITEMS, groups);
const sorted=[…accessibleItems].filter(i=>i.ownerId!==ME.id).sort((a,b)=>feedScore(b,ME.tags,ME.size)-feedScore(a,ME.tags,ME.size));
const inMySize=sorted.filter(i=>i.size===ME.size&&i.status===“available”);

const handleJoin = () => {
const code = joinInput.trim().toUpperCase();
const found = groups.find(g => g.code === code);
if (found) {
setJoinError(””);
setJoinInput(””);
onJoinByCode(code, found);
} else {
setJoinError(“Code not found. Check with your friend and try again.”);
}
};

return(
<div>
{/* My closet banner */}
<div onClick={onOpenMyCloset} style={{margin:“12px 16px 0”,background:C.ink,borderRadius:18,padding:“14px 18px”,display:“flex”,alignItems:“center”,gap:14,cursor:“pointer”}}>
<div style={{width:48,height:48,borderRadius:“50%”,background:C.yellow,display:“flex”,alignItems:“center”,justifyContent:“center”,fontSize:22,flexShrink:0}}>✨</div>
<div style={{flex:1}}><div style={{color:“white”,fontWeight:900,fontSize:15,fontFamily:F}}>Emma’s Closet</div><div style={{color:C.muted,fontSize:11,fontFamily:M,marginTop:2}}>{myItems.length} items · ❤️{myItems.reduce((s,i)=>s+i.likes,0)} · 👁{myItems.reduce((s,i)=>s+i.views,0)}</div></div>
<div style={{textAlign:“right”}}><div style={{color:C.yellow,fontWeight:800,fontSize:11,fontFamily:M}}>7🔥 streak</div><div style={{color:C.muted,fontSize:10,fontFamily:M}}>View closet →</div></div>
</div>

```
  {/* Join by code quick bar */}
  <div style={{margin:"12px 16px 0",background:`${C.lavender}20`,border:`2px solid ${C.lavender}40`,borderRadius:14,padding:"12px 14px"}}>
    <div style={{fontSize:11,fontWeight:800,fontFamily:M,color:C.lavender,marginBottom:8}}>🔑 JOIN A GROUP BY CODE</div>
    <div style={{display:"flex",gap:8}}>
      <input value={joinInput} onChange={e=>{setJoinInput(e.target.value.toUpperCase());setJoinError("");}} placeholder="Enter invite code (e.g. GC-XXXX)" style={{flex:1,padding:"10px 12px",borderRadius:10,border:`2px solid ${joinError?C.red:joinInput?C.lavender:C.border}`,fontSize:12,fontFamily:M,outline:"none",letterSpacing:1.5,textTransform:"uppercase",background:C.bg}}/>
      <Btn small onClick={handleJoin} disabled={!joinInput.trim()} variant="purple">Join</Btn>
    </div>
    {joinError&&<div style={{fontSize:11,color:C.red,fontFamily:M,marginTop:6}}>{joinError}</div>}
  </div>

  {/* Groups row */}
  <div style={{padding:"16px 16px 0"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
      <div style={{fontWeight:900,fontSize:16,fontFamily:F,color:C.ink}}>Your Groups</div>
      <button onClick={()=>onGroupSelect("create")} style={{background:"none",border:`2px solid ${C.ink}`,borderRadius:10,padding:"5px 12px",cursor:"pointer",fontFamily:M,fontWeight:800,fontSize:11,color:C.ink}}>+ New Group</button>
    </div>
    <div style={{display:"flex",gap:12,overflowX:"auto",paddingBottom:8,scrollSnapType:"x mandatory"}}>
      {groups.map(g=>{
        const gItems=g.sharedItems.map(id=>INIT_ITEMS.find(i=>i.id===id)).filter(Boolean);
        const newCount=gItems.filter(i=>(NOW-i.addedAt)/DAY<1).length;
        const isMember=g.members.includes(ME.id);
        return(
          <div key={g.id} onClick={()=>isMember&&onGroupSelect(g)} style={{flexShrink:0,width:170,background:C.card,borderRadius:18,border:`2px solid ${isMember?g.color+"60":C.border}`,cursor:isMember?"pointer":"not-allowed",overflow:"hidden",scrollSnapAlign:"start",boxShadow:isMember?`0 4px 16px ${g.color}25`:"none",opacity:isMember?1:0.5}}>
            <div style={{background:isMember?`linear-gradient(135deg,${g.color}30,${g.color}60)`:`${C.border}`,padding:"14px 14px 12px"}}>
              <div style={{fontSize:28,marginBottom:6}}>{g.emoji}</div>
              <div style={{fontWeight:900,fontSize:14,color:C.ink,fontFamily:F,lineHeight:1.2}}>{g.name}</div>
              <div style={{fontSize:10,color:C.muted,fontFamily:M,marginTop:3}}>{g.members.length} members {!isMember&&"· Not a member"}</div>
            </div>
            <div style={{padding:"10px 14px 12px"}}>
              <MemberAvatars memberIds={g.members} max={3} size={26}/>
              <div style={{marginTop:8,fontSize:10,fontFamily:F,color:C.muted,lineHeight:1.4}}>{g.activity}</div>
              <div style={{display:"flex",gap:6,marginTop:8}}><Badge color={isMember?g.color:C.muted}>{gItems.length} items</Badge>{newCount>0&&isMember&&<Badge color={C.sage}>+{newCount} new</Badge>}</div>
            </div>
          </div>
        );
      })}
      <div onClick={()=>onGroupSelect("create")} style={{flexShrink:0,width:140,background:"transparent",borderRadius:18,border:`2px dashed ${C.border}`,cursor:"pointer",scrollSnapAlign:"start",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,padding:20,minHeight:160}}>
        <div style={{fontSize:32,color:C.muted}}>+</div>
        <div style={{fontSize:12,color:C.muted,fontFamily:M,fontWeight:800,textAlign:"center"}}>Create Group Closet</div>
      </div>
    </div>
  </div>

  {/* Feed — enforced: only accessible items */}
  <div style={{padding:"16px 16px 0"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
      <div>
        <div style={{fontWeight:900,fontSize:16,fontFamily:F,color:C.ink}}>Your Feed</div>
        <div style={{fontSize:9,color:C.muted,fontFamily:M,letterSpacing:.5}}>🔒 Only items from your groups · {accessibleItems.filter(i=>i.ownerId!==ME.id).length} items visible to you</div>
      </div>
      <div style={{display:"flex",gap:6}}>
        {[{id:"groups",label:"Groups"},{id:"mysize",label:"My Size"}].map(f=>(
          <button key={f.id} onClick={()=>setView(f.id)} style={{background:view===f.id?C.ink:"transparent",color:view===f.id?C.yellow:C.muted,border:`2px solid ${view===f.id?C.ink:C.border}`,borderRadius:20,padding:"4px 11px",fontSize:10,fontWeight:800,cursor:"pointer",fontFamily:M}}>{f.label}</button>
        ))}
      </div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginTop:10}}>
      {(view==="mysize"?inMySize:sorted).map(item=><ItemCard key={item.id} item={item} onSelect={onItemSelect}/>)}
    </div>
    {sorted.length===0&&<div style={{textAlign:"center",padding:40,color:C.muted,fontFamily:F}}><div style={{fontSize:40,marginBottom:10}}>🔒</div><div style={{fontWeight:800,marginBottom:6,fontFamily:F}}>No items yet</div><div style={{fontSize:13}}>Join a group or invite friends to start swapping!</div></div>}
    <div style={{height:20}}/>
  </div>
</div>
```

);
}

// ═══════════════════════════════════════════════════════════════════
// GROUP DETAIL — access-enforced, with group chat & invite system
// ═══════════════════════════════════════════════════════════════════
function GroupDetail({group,onBack,onItemSelect,allGroups}) {
const [view,setView]=useState(“closet”); // closet | chat | invite
const [chatView,setChatView]=useState(“group”); // group | dm
const [activeDM,setActiveDM]=useState(null);
const [groupChats,setGroupChats]=useState(INIT_GROUP_CHATS);
const [dmThreads,setDmThreads]=useState(INIT_DM_THREADS);
const [msg,setMsg]=useState(””);
const [invitePhone,setInvitePhone]=useState(””);
const [inviteSent,setInviteSent]=useState(false);
const [codeJoined,setCodeJoined]=useState(false);
const [pendingInvites,setPendingInvites]=useState(INIT_PENDING_INVITES.filter(i=>i.groupId===group.id));
const chatEndRef=useRef(null);

// Access enforcement: verify user is a member
const isMember = group.members.includes(ME.id);
if (!isMember) return (
<div style={{background:C.bg,minHeight:“100vh”,display:“flex”,flexDirection:“column”,alignItems:“center”,justifyContent:“center”,padding:40,textAlign:“center”}}>
<div style={{fontSize:60,marginBottom:16}}>🔒</div>
<div style={{fontSize:22,fontWeight:900,fontFamily:F,color:C.ink,marginBottom:8}}>Members Only</div>
<div style={{fontSize:14,color:C.muted,fontFamily:F,lineHeight:1.6,marginBottom:24}}>You’re not a member of {group.name}. Ask a member for their invite code to join.</div>
<Btn onClick={onBack}>← Go Back</Btn>
</div>
);

const members=group.members.map(id=>ALL_USERS.find(u=>u.id===id)).filter(Boolean);
const items=group.sharedItems.map(id=>INIT_ITEMS.find(i=>i.id===id)).filter(Boolean);
const filtered=[…items].sort((a,b)=>feedScore(b,ME.tags,ME.size)-feedScore(a,ME.tags,ME.size));
const groupMessages=groupChats[group.id]||[];
const otherMembers=members.filter(u=>u.id!==ME.id);

// ── Send message helpers ──────────────────────────────────────────
const sendGroupMsg=()=>{
if(!msg.trim()) return;
setGroupChats(prev=>({…prev,[group.id]:[…(prev[group.id]||[]),{id:Date.now(),from:“u1”,text:msg,time:“now”}]}));
setMsg(””); setTimeout(()=>chatEndRef.current?.scrollIntoView({behavior:“smooth”}),50);
};
const sendDM=(uid)=>{
if(!msg.trim()) return;
setDmThreads(prev=>({…prev,[uid]:[…(prev[uid]||[]),{id:Date.now(),from:“u1”,text:msg,time:“now”}]}));
setMsg(””); setTimeout(()=>chatEndRef.current?.scrollIntoView({behavior:“smooth”}),50);
};

// ── SMS invite ────────────────────────────────────────────────────
const handleSmsInvite=()=>{
const link=buildSmsLink(group.code,group.name,invitePhone);
window.open(link,”_blank”);
setInviteSent(true);
if(invitePhone) setPendingInvites(prev=>[…prev,{id:`inv${Date.now()}`,groupId:group.id,code:group.code,name:“Friend”,phone:invitePhone,sentAt:NOW,status:“pending”}]);
setInvitePhone(””);
setTimeout(()=>setInviteSent(false),4000);
};

const handleCopyCode=()=>{
try{navigator.clipboard.writeText(group.code);}catch(e){}
setCodeJoined(true);
setTimeout(()=>setCodeJoined(false),2000);
};

return(
<div style={{background:C.bg,minHeight:“100vh”}}>
{/* Group header */}
<div style={{background:`linear-gradient(135deg,${group.color}40,${group.color}70)`,padding:“20px 16px”}}>
<button onClick={onBack} style={{background:“rgba(26,26,46,.2)”,border:“none”,borderRadius:10,padding:“6px 12px”,cursor:“pointer”,color:C.ink,fontFamily:M,fontWeight:800,fontSize:11,marginBottom:12}}>← Back</button>
<div style={{fontSize:40,marginBottom:8}}>{group.emoji}</div>
<div style={{fontWeight:900,fontSize:24,color:C.ink,fontFamily:F}}>{group.name}</div>
<div style={{fontSize:12,color:C.muted,fontFamily:F,marginTop:3}}>{group.desc}</div>
<div style={{display:“flex”,alignItems:“center”,gap:12,marginTop:12}}><MemberAvatars memberIds={group.members} max={5} size={32}/><div style={{fontSize:11,color:C.muted,fontFamily:M}}>{group.members.length} members</div></div>
{/* Code + copy */}
<div style={{display:“flex”,gap:8,marginTop:12,alignItems:“center”,flexWrap:“wrap”}}>
<div style={{background:“rgba(26,26,46,.18)”,borderRadius:10,padding:“7px 12px”,fontFamily:M,fontWeight:800,fontSize:13,color:C.ink,letterSpacing:2,border:`1px solid rgba(26,26,46,.2)`}}>{group.code}</div>
<button onClick={handleCopyCode} style={{background:C.ink,border:“none”,borderRadius:10,padding:“7px 14px”,cursor:“pointer”,fontFamily:M,fontWeight:800,fontSize:11,color:codeJoined?C.sage:C.yellow}}>
{codeJoined?“✓ Copied!”:“📋 Copy Code”}
</button>
<button onClick={()=>setView(“invite”)} style={{background:C.sage,border:“none”,borderRadius:10,padding:“7px 14px”,cursor:“pointer”,fontFamily:M,fontWeight:800,fontSize:11,color:“white”}}>
📱 Invite by Text
</button>
</div>
</div>

```
  {/* Sub-nav */}
  <div style={{display:"flex",background:C.card,borderBottom:`2px solid ${C.border}`}}>
    {[{id:"closet",label:"👗 Closet"},{id:"chat",label:"💬 Chat"},{id:"invite",label:"📱 Invite"}].map(v=>(
      <button key={v.id} onClick={()=>setView(v.id)} style={{flex:1,background:"none",border:"none",padding:"12px 4px",cursor:"pointer",fontFamily:M,fontWeight:800,fontSize:11,color:view===v.id?C.ink:C.muted,borderBottom:view===v.id?`3px solid ${C.ink}`:"3px solid transparent"}}>
        {v.label}
      </button>
    ))}
  </div>

  {/* ── CLOSET VIEW ── */}
  {view==="closet"&&(
    <div style={{padding:"14px 16px 0"}}>
      {group.isSharedCloset&&<div style={{background:`${C.sage}18`,border:`2px solid ${C.sage}`,borderRadius:14,padding:"11px 14px",marginBottom:14,display:"flex",alignItems:"center",gap:10}}><span style={{fontSize:20}}>👗</span><div><div style={{fontWeight:800,fontSize:12,fontFamily:M,color:C.sage}}>Shared Group Closet ON</div><div style={{fontSize:11,fontFamily:F,color:C.muted}}>All members can browse and request items · 🔒 visible to this group only</div></div></div>}
      {/* Members strip */}
      <div style={{fontWeight:800,fontSize:13,fontFamily:F,color:C.ink,marginBottom:10}}>Members' Closets</div>
      <div style={{display:"flex",gap:10,overflowX:"auto",paddingBottom:12}}>
        {members.map(u=>{const uItems=items.filter(i=>i.ownerId===u.id);return(<div key={u.id} style={{flexShrink:0,textAlign:"center",width:70,cursor:"pointer"}} onClick={()=>{setChatView("dm");setActiveDM(u.id);setView("chat");}}>
          <div style={{width:52,height:52,borderRadius:"50%",background:`${C.yellow}35`,border:`2px solid ${u.id===ME.id?C.ink:C.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,margin:"0 auto 5px"}}>{u.emoji}</div>
          <div style={{fontSize:10,fontWeight:800,fontFamily:M,color:C.ink,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{u.name}</div>
          <div style={{fontSize:9,color:C.muted,fontFamily:M}}>{uItems.length} items</div>
          {u.id!==ME.id&&<div style={{fontSize:9,color:C.lavender,fontFamily:M}}>💬 DM</div>}
        </div>);})}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        {filtered.map(item=><ItemCard key={item.id} item={item} onSelect={onItemSelect}/>)}
      </div>
      {filtered.length===0&&<div style={{textAlign:"center",padding:40,color:C.muted,fontFamily:F}}><div style={{fontSize:36,marginBottom:8}}>👗</div>No items yet — members can add items from their closet!</div>}
      <div style={{height:20}}/>
    </div>
  )}

  {/* ── CHAT VIEW ── */}
  {view==="chat"&&(
    <div style={{display:"flex",flexDirection:"column",height:"calc(100vh - 180px)"}}>
      {/* Chat sub-nav: Group chat vs DMs */}
      <div style={{padding:"12px 16px 0"}}>
        <div style={{display:"flex",gap:8,marginBottom:10}}>
          <button onClick={()=>{setChatView("group");setActiveDM(null);}} style={{background:chatView==="group"?C.ink:"transparent",color:chatView==="group"?C.yellow:C.muted,border:`2px solid ${chatView==="group"?C.ink:C.border}`,borderRadius:20,padding:"6px 14px",fontSize:11,fontWeight:800,cursor:"pointer",fontFamily:M}}>
            🏠 {group.name}
          </button>
          <button onClick={()=>setChatView("dms")} style={{background:chatView==="dms"||chatView==="dm"?C.ink:"transparent",color:chatView==="dms"||chatView==="dm"?C.yellow:C.muted,border:`2px solid ${chatView==="dms"||chatView==="dm"?C.ink:C.border}`,borderRadius:20,padding:"6px 14px",fontSize:11,fontWeight:800,cursor:"pointer",fontFamily:M}}>
            💬 Direct Messages
          </button>
        </div>
      </div>

      {/* Group chat */}
      {chatView==="group"&&(
        <>
          <div style={{flex:1,overflowY:"auto",padding:"0 16px",display:"flex",flexDirection:"column",gap:10}}>
            {groupMessages.map((m,i)=>{
              const isMe=m.from==="u1";
              const sender=ALL_USERS.find(u=>u.id===m.from);
              return(
                <div key={m.id||i} style={{display:"flex",flexDirection:isMe?"row-reverse":"row",gap:8,alignItems:"flex-end"}}>
                  {!isMe&&<div style={{width:28,height:28,borderRadius:"50%",background:`${C.yellow}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>{sender?.emoji||"👤"}</div>}
                  <div style={{maxWidth:"72%"}}>
                    {!isMe&&<div style={{fontSize:9,color:C.muted,fontFamily:M,marginBottom:2,paddingLeft:2}}>{sender?.name}</div>}
                    <div style={{background:isMe?C.ink:`${C.border}80`,color:isMe?C.yellow:C.ink,borderRadius:isMe?"16px 16px 4px 16px":"16px 16px 16px 4px",padding:"10px 14px"}}>
                      <div style={{fontSize:13,fontFamily:F,lineHeight:1.5}}>{m.text}</div>
                      <div style={{fontSize:9,color:isMe?"rgba(255,255,255,.4)":C.muted,fontFamily:M,marginTop:4,textAlign:"right"}}>{m.time}</div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={chatEndRef}/>
          </div>
          <div style={{padding:"10px 16px 16px",borderTop:`2px solid ${C.border}`,background:C.bg}}>
            <div style={{display:"flex",gap:8}}>
              <input value={msg} onChange={e=>setMsg(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendGroupMsg();}}} placeholder={`Message ${group.name}…`} style={{flex:1,padding:"10px 14px",borderRadius:22,border:`2px solid ${C.border}`,fontSize:13,fontFamily:F,outline:"none",background:C.card}}/>
              <button onClick={sendGroupMsg} style={{background:C.ink,border:"none",borderRadius:"50%",width:44,height:44,cursor:"pointer",color:C.yellow,fontSize:18,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>→</button>
            </div>
          </div>
        </>
      )}

      {/* DM list */}
      {chatView==="dms"&&(
        <div style={{padding:"0 16px",overflowY:"auto",flex:1}}>
          <div style={{fontSize:10,color:C.muted,fontFamily:M,letterSpacing:.8,textTransform:"uppercase",marginBottom:12}}>Direct Messages</div>
          {otherMembers.map(u=>{
            const thread=dmThreads[u.id]||[];
            const last=thread[thread.length-1];
            const unread=u.id==="u2"; // sim
            return(
              <div key={u.id} onClick={()=>{setActiveDM(u.id);setChatView("dm");setMsg("");}} style={{background:C.card,border:`2px solid ${unread?C.sky:C.border}`,borderRadius:14,padding:14,marginBottom:10,display:"flex",alignItems:"center",gap:12,cursor:"pointer"}}>
                <div style={{position:"relative"}}>
                  <div style={{width:44,height:44,borderRadius:"50%",background:`${C.yellow}35`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>{u.emoji}</div>
                  {unread&&<div style={{position:"absolute",top:0,right:0,width:10,height:10,background:C.coral,borderRadius:"50%",border:`2px solid ${C.bg}`}}/>}
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontWeight:800,fontSize:13,fontFamily:F,color:C.ink}}>{u.name} {u.emoji}</div>
                  {last&&<div style={{fontSize:11,color:C.muted,fontFamily:F,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{last.from==="u1"?"You: ":""}{last.text}</div>}
                </div>
                <div style={{fontSize:10,color:C.muted,fontFamily:M,flexShrink:0}}>{last?.time||""}</div>
              </div>
            );
          })}
        </div>
      )}

      {/* DM thread */}
      {chatView==="dm"&&activeDM&&(()=>{
        const peer=ALL_USERS.find(u=>u.id===activeDM);
        const thread=dmThreads[activeDM]||[];
        return(
          <>
            <div style={{padding:"8px 16px 10px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:10}}>
              <button onClick={()=>{setChatView("dms");setActiveDM(null);}} style={{background:"none",border:"none",fontSize:18,cursor:"pointer",color:C.muted}}>←</button>
              <div style={{width:34,height:34,borderRadius:"50%",background:`${C.yellow}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{peer?.emoji}</div>
              <div><div style={{fontWeight:800,fontSize:14,fontFamily:F,color:C.ink}}>{peer?.name} {peer?.emoji}</div><div style={{fontSize:10,color:C.sage,fontFamily:M}}>● In {group.name}</div></div>
            </div>
            <div style={{flex:1,overflowY:"auto",padding:"12px 16px",display:"flex",flexDirection:"column",gap:10}}>
              {thread.map((m,i)=>{
                const isMe=m.from==="u1";
                return(
                  <div key={m.id||i} style={{display:"flex",justifyContent:isMe?"flex-end":"flex-start"}}>
                    <div style={{background:isMe?C.ink:`${C.border}80`,color:isMe?C.yellow:C.ink,borderRadius:isMe?"16px 16px 4px 16px":"16px 16px 16px 4px",padding:"10px 14px",maxWidth:"75%"}}>
                      <div style={{fontSize:13,fontFamily:F,lineHeight:1.5}}>{m.text}</div>
                      <div style={{fontSize:9,color:isMe?"rgba(255,255,255,.4)":C.muted,fontFamily:M,marginTop:4,textAlign:"right"}}>{m.time}</div>
                    </div>
                  </div>
                );
              })}
              <div ref={chatEndRef}/>
            </div>
            <div style={{padding:"10px 16px 16px",borderTop:`2px solid ${C.border}`,background:C.bg}}>
              <div style={{display:"flex",gap:8}}>
                <input value={msg} onChange={e=>setMsg(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendDM(activeDM);}}} placeholder={`Message ${peer?.name}…`} style={{flex:1,padding:"10px 14px",borderRadius:22,border:`2px solid ${C.border}`,fontSize:13,fontFamily:F,outline:"none",background:C.card}}/>
                <button onClick={()=>sendDM(activeDM)} style={{background:C.ink,border:"none",borderRadius:"50%",width:44,height:44,cursor:"pointer",color:C.yellow,fontSize:18,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>→</button>
              </div>
            </div>
          </>
        );
      })()}
    </div>
  )}

  {/* ── INVITE VIEW ── */}
  {view==="invite"&&(
    <div style={{padding:"16px 16px 0",overflowY:"auto",maxHeight:"calc(100vh - 200px)"}}>
      {/* Invite code */}
      <div style={{background:C.ink,borderRadius:18,padding:20,marginBottom:16,textAlign:"center"}}>
        <div style={{fontSize:11,color:C.muted,fontFamily:M,letterSpacing:1,textTransform:"uppercase",marginBottom:8}}>Your Group Invite Code</div>
        <div style={{fontSize:32,fontWeight:900,fontFamily:M,letterSpacing:6,color:C.yellow,marginBottom:8}}>{group.code}</div>
        <div style={{fontSize:12,color:"#aaa",fontFamily:F,marginBottom:16}}>Share this code and friends can enter it in the app to join your group instantly.</div>
        <div style={{display:"flex",gap:10,justifyContent:"center"}}>
          <button onClick={handleCopyCode} style={{background:codeJoined?C.sage:C.yellow,border:"none",borderRadius:12,padding:"10px 20px",cursor:"pointer",fontFamily:M,fontWeight:800,fontSize:13,color:C.ink,transition:"all .2s"}}>
            {codeJoined?"✓ Copied!":"📋 Copy Code"}
          </button>
        </div>
      </div>

      {/* SMS invite */}
      <div style={{background:C.card,border:`2px solid ${C.border}`,borderRadius:16,padding:18,marginBottom:16}}>
        <div style={{fontWeight:900,fontSize:16,fontFamily:F,color:C.ink,marginBottom:4}}>📱 Invite by Text</div>
        <div style={{fontSize:13,color:C.muted,fontFamily:F,lineHeight:1.6,marginBottom:14}}>
          Send a text with your invite link. Works for both new and existing Swap users:
          <br/>• <strong>New user:</strong> gets a download link + join code
          <br/>• <strong>Existing user:</strong> opens the app and gets instant group access
        </div>
        <input value={invitePhone} onChange={e=>setInvitePhone(e.target.value)} placeholder="Enter phone number (optional)" type="tel"
          style={{width:"100%",padding:"12px 14px",borderRadius:12,boxSizing:"border-box",border:`2px solid ${C.border}`,fontSize:14,fontFamily:F,background:C.bg,outline:"none",marginBottom:12}}/>
        <div style={{display:"flex",gap:8}}>
          <button onClick={handleSmsInvite} style={{flex:1,background:C.ink,color:C.yellow,border:"none",borderRadius:12,padding:"12px",cursor:"pointer",fontFamily:M,fontWeight:800,fontSize:13,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
            {inviteSent?"✓ Text Sent!":"💬 Send iOS Text"}
          </button>
          <button onClick={()=>{const link=buildSmsLink(group.code,group.name,invitePhone);window.open(link.replace("sms:","sms:"),"_blank");setInviteSent(true);setInvitePhone("");setTimeout(()=>setInviteSent(false),4000);}} style={{flex:1,background:C.sage,color:"white",border:"none",borderRadius:12,padding:"12px",cursor:"pointer",fontFamily:M,fontWeight:800,fontSize:13}}>
            💬 Send Android
          </button>
        </div>
        <div style={{fontSize:10,color:C.muted,fontFamily:M,marginTop:8,textAlign:"center"}}>Opens your native SMS app with the invite pre-written</div>
      </div>

      {/* Pending invites */}
      {pendingInvites.length>0&&(
        <div style={{marginBottom:16}}>
          <div style={{fontSize:11,fontFamily:M,color:C.muted,letterSpacing:.8,textTransform:"uppercase",marginBottom:10}}>Pending Invites ({pendingInvites.length})</div>
          {pendingInvites.map(inv=>(
            <div key={inv.id} style={{background:C.card,border:`2px solid ${C.border}`,borderRadius:12,padding:12,marginBottom:8,display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:36,height:36,borderRadius:"50%",background:`${C.lavender}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>📱</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:800,fontSize:13,fontFamily:F,color:C.ink}}>{inv.name}</div>
                <div style={{fontSize:10,color:C.muted,fontFamily:M}}>{inv.phone} · Invite sent · {inv.status}</div>
              </div>
              <div style={{width:8,height:8,borderRadius:"50%",background:C.amber}}/>
            </div>
          ))}
        </div>
      )}

      {/* Current members */}
      <div style={{marginBottom:16}}>
        <div style={{fontSize:11,fontFamily:M,color:C.muted,letterSpacing:.8,textTransform:"uppercase",marginBottom:10}}>Current Members ({members.length})</div>
        {members.map(u=>(
          <div key={u.id} style={{background:C.card,border:`2px solid ${C.border}`,borderRadius:12,padding:12,marginBottom:8,display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:38,height:38,borderRadius:"50%",background:`${C.yellow}35`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{u.emoji}</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:800,fontSize:13,fontFamily:F,color:C.ink}}>{u.name}</div>
              <div style={{fontSize:10,color:C.muted,fontFamily:M}}>{u.tags.join(" · ")} · {u.streak}🔥</div>
            </div>
            {u.id===group.createdBy&&<div style={{fontSize:9,fontWeight:800,fontFamily:M,background:`${C.sage}20`,color:C.sage,padding:"2px 8px",borderRadius:8}}>Admin</div>}
            {u.id===ME.id&&<div style={{fontSize:9,fontWeight:800,fontFamily:M,background:`${C.sky}20`,color:C.sky,padding:"2px 8px",borderRadius:8}}>You</div>}
          </div>
        ))}
      </div>
      <div style={{height:20}}/>
    </div>
  )}
</div>
```

);
}

// ─── CREATE GROUP (abbreviated) ───────────────────────────────────
function CreateGroup({onBack,onCreate}) {
const [step,setStep]=useState(0);
const [gName,setGName]=useState(””); const [gEmoji,setGEmoji]=useState(“👗”); const [gColor,setGColor]=useState(C.yellow);
const [isShared,setIsShared]=useState(true); const [selected,setSelected]=useState([“u1”]);
const newCode=`GC-${Math.random().toString(36).substr(2,4).toUpperCase()}`;
const groupEmojis=[“👗”,“🏆”,“🦋”,“🎨”,“🌸”,“🔥”,“💫”,“🌙”,“⭐”,“🎀”,“🛍”,“✨”];
const groupColors=[C.yellow,C.lavender,C.coral,C.sage,C.sky,C.peach,C.teal];
const [done,setDone]=useState(false);
const handleCreate=()=>{onCreate({id:`g${Date.now()}`,name:gName,emoji:gEmoji,color:gColor,members:selected,createdBy:“u1”,code:newCode,desc:`${gName} closet ✨`,isSharedCloset:isShared,sharedItems:INIT_ITEMS.filter(i=>selected.includes(i.ownerId)).map(i=>i.id).slice(0,6),activity:“Group created just now”});setDone(true);};
if(done) return(
<div style={{background:C.ink,minHeight:“100vh”,display:“flex”,flexDirection:“column”,alignItems:“center”,justifyContent:“center”,padding:“40px 28px”,textAlign:“center”}}>
<div style={{fontSize:72,marginBottom:16}}>{gEmoji}</div>
<div style={{fontSize:28,fontWeight:900,color:C.yellow,fontFamily:F,marginBottom:8}}>{gName} is live! 🎉</div>
<div style={{background:“rgba(255,255,255,.08)”,borderRadius:16,padding:“14px 20px”,marginBottom:24,width:“100%”}}>
<div style={{fontSize:10,color:C.muted,fontFamily:M,letterSpacing:1,marginBottom:6}}>INVITE CODE</div>
<div style={{fontSize:26,fontWeight:900,fontFamily:M,letterSpacing:4,color:C.yellow}}>{newCode}</div>
</div>
<Btn full onClick={onBack} style={{fontSize:15,padding:“14px”}}>✦ Go to Group</Btn>
</div>
);
return(
<div style={{background:C.bg,minHeight:“100vh”}}>
<div style={{background:C.ink,padding:“14px 16px”,display:“flex”,alignItems:“center”,gap:12}}>
<button onClick={onBack} style={{background:“none”,border:“none”,color:C.muted,fontSize:20,cursor:“pointer”}}>←</button>
<div style={{color:“white”,fontWeight:900,fontSize:16,fontFamily:F}}>Create Group Closet</div>
</div>
<div style={{display:“flex”,padding:“16px 16px 0”,gap:6}}>{[0,1,2].map(i=><div key={i} style={{flex:1,height:4,borderRadius:2,background:i<=step?C.ink:C.border,transition:“all .3s”}}/>)}</div>
<div style={{padding:“20px 16px”}}>
{step===0&&<div>
<div style={{fontSize:22,fontWeight:900,fontFamily:F,color:C.ink,marginBottom:16}}>Name your group</div>
<input value={gName} onChange={e=>setGName(e.target.value)} placeholder=“Group name…” style={{width:“100%”,padding:“13px 14px”,borderRadius:12,boxSizing:“border-box”,border:`2px solid ${gName?C.ink:C.border}`,fontSize:14,fontFamily:F,background:C.bg,outline:“none”,marginBottom:14}}/>
<div style={{display:“flex”,flexWrap:“wrap”,gap:8,marginBottom:14}}>{groupEmojis.map(e=><button key={e} onClick={()=>setGEmoji(e)} style={{fontSize:24,background:gEmoji===e?C.yellow:C.border,border:`2px solid ${gEmoji===e?C.ink:"transparent"}`,borderRadius:10,padding:“6px 10px”,cursor:“pointer”}}>{e}</button>)}</div>
<div style={{display:“flex”,gap:8,marginBottom:20}}>{groupColors.map(col=><button key={col} onClick={()=>setGColor(col)} style={{width:32,height:32,borderRadius:“50%”,background:col,border:`3px solid ${gColor===col?C.ink:"transparent"}`,cursor:“pointer”}}/>)}</div>
<Btn full onClick={()=>gName&&setStep(1)} disabled={!gName}>Next: Add Members →</Btn>
</div>}
{step===1&&<div>
<div style={{fontSize:22,fontWeight:900,fontFamily:F,color:C.ink,marginBottom:16}}>Add members</div>
{ALL_USERS.filter(u=>u.id!==“u1”).map(u=>{const sel=selected.includes(u.id);return(<div key={u.id} onClick={()=>setSelected(s=>s.includes(u.id)?s.filter(x=>x!==u.id):[…s,u.id])} style={{background:sel?`${gColor}20`:C.card,border:`2px solid ${sel?gColor:C.border}`,borderRadius:14,padding:12,marginBottom:8,display:“flex”,alignItems:“center”,gap:12,cursor:“pointer”}}>
<div style={{width:40,height:40,borderRadius:“50%”,background:`${C.yellow}35`,display:“flex”,alignItems:“center”,justifyContent:“center”,fontSize:20}}>{u.emoji}</div>
<div style={{flex:1}}><div style={{fontWeight:800,fontSize:13,fontFamily:F,color:C.ink}}>{u.name}</div><div style={{fontSize:10,color:C.muted,fontFamily:M}}>{u.tags.join(” · “)}</div></div>
<div style={{width:22,height:22,borderRadius:“50%”,background:sel?gColor:C.border,display:“flex”,alignItems:“center”,justifyContent:“center”,color:“white”,fontSize:13,fontWeight:800}}>{sel?“✓”:””}</div>
</div>);})}
<div style={{display:“flex”,gap:8,marginTop:10}}><Btn variant=“secondary” onClick={()=>setStep(0)}>← Back</Btn><Btn style={{flex:1}} onClick={()=>setStep(2)}>Next: Settings →</Btn></div>
</div>}
{step===2&&<div>
<div style={{fontSize:22,fontWeight:900,fontFamily:F,color:C.ink,marginBottom:16}}>Group settings</div>
<div style={{background:`linear-gradient(135deg,${gColor}30,${gColor}60)`,borderRadius:18,padding:“18px 18px 16px”,marginBottom:16}}>
<div style={{fontSize:36,marginBottom:6}}>{gEmoji}</div>
<div style={{fontWeight:900,fontSize:18,color:C.ink,fontFamily:F}}>{gName}</div>
<div style={{fontSize:11,color:C.muted,fontFamily:F,marginTop:2}}>{selected.length} members</div>
<MemberAvatars memberIds={selected} max={5} size={28}/>
</div>
<div style={{background:C.card,border:`2px solid ${isShared?C.sage:C.border}`,borderRadius:16,padding:16,marginBottom:14}}>
<div style={{display:“flex”,justifyContent:“space-between”,alignItems:“center”,marginBottom:8}}>
<div><div style={{fontWeight:800,fontSize:14,fontFamily:F,color:C.ink}}>👗 Shared Group Closet</div><div style={{fontSize:12,color:C.muted,fontFamily:F,marginTop:2}}>All members can browse and request each other’s items</div></div>
<button onClick={()=>setIsShared(s=>!s)} style={{width:44,height:24,borderRadius:12,background:isShared?C.sage:C.border,border:“none”,cursor:“pointer”,position:“relative”,transition:“all .2s”,flexShrink:0}}><div style={{width:18,height:18,borderRadius:“50%”,background:“white”,position:“absolute”,top:3,left:isShared?23:3,transition:“left .2s”}}/></button>
</div>
</div>
<div style={{background:`${C.yellow}40`,border:`2px solid ${C.yellow}`,borderRadius:14,padding:14,marginBottom:20}}><div style={{fontWeight:800,fontSize:12,fontFamily:M,color:C.ink,marginBottom:6}}>🔒 Always invite-only</div><div style={{fontSize:12,fontFamily:F,color:C.ink,lineHeight:1.6}}>Your group is private. Items are never visible outside this group. Exchanges happen in person only — at school, on the bus, or at a Circle friend’s home.</div></div>
<div style={{display:“flex”,gap:8}}><Btn variant=“secondary” onClick={()=>setStep(1)}>← Back</Btn><Btn style={{flex:1}} onClick={handleCreate} variant="success">✦ Create {gName}</Btn></div>
</div>}
</div>
</div>
);
}

// ─── TRACKER ─────────────────────────────────────────────────────
function Tracker() {
const [ious,setIous]=useState([
{id:1,item:“Denim Jacket”,emoji:“🧥”,borrower:“You”,owner:“Zoe 🌸”,returnDays:5,status:“active”,returnPref:“clean”},
{id:2,item:“Floral Mini Skirt”,emoji:“🌷”,borrower:“Mia 🦋”,owner:“You”,returnDays:3,status:“overdue”,returnPref:“unlaundered”},
]);
return(
<div style={{padding:“12px 16px 0”}}>
<div style={{background:C.ink,borderRadius:16,padding:18,display:“grid”,gridTemplateColumns:“1fr 1fr”,textAlign:“center”,marginBottom:20,gap:8}}>
{[{l:“You have”,v:ious.filter(i=>i.borrower===“You”).length,c:C.sky,i:“📦”},{l:“Overdue”,v:ious.filter(i=>i.status===“overdue”).length,c:C.coral,i:“⚠️”}].map((s,i)=>(<div key={i}><div style={{fontSize:22}}>{s.i}</div><div style={{fontSize:22,fontWeight:900,color:s.c,fontFamily:M}}>{s.v}</div><div style={{fontSize:9,color:C.muted,fontFamily:M}}>{s.l}</div></div>))}
</div>
{ious.map(iou=>(
<div key={iou.id} style={{background:iou.status===“overdue”?”#FFF0F0”:”#F0FFF4”,border:`2px solid ${iou.status==="overdue"?C.coral:C.sage}`,borderRadius:14,padding:16,marginBottom:12}}>
<div style={{display:“flex”,justifyContent:“space-between”,alignItems:“center”,marginBottom:6}}><div style={{fontWeight:800,fontSize:14,color:C.ink,fontFamily:F}}>{iou.emoji} {iou.item}</div><Badge color={iou.status===“overdue”?C.coral:C.sage}>{iou.status===“overdue”?“⚠️ Late”:“Active”}</Badge></div>
<div style={{fontSize:12,color:C.muted,fontFamily:M,marginBottom:10}}>{iou.borrower===“You”?`From ${iou.owner}`:`Lent to ${iou.borrower}`} · ↩ {iou.returnDays}d</div>
{/* Return pref display */}
<div style={{background:iou.returnPref===“unlaundered”?`${C.peach}40`:`${C.sage}20`,border:`2px solid ${iou.returnPref==="unlaundered"?C.peach:C.sage}`,borderRadius:10,padding:“8px 12px”,marginBottom:10,display:“flex”,alignItems:“center”,gap:8}}>
<span style={{fontSize:16}}>{iou.returnPref===“unlaundered”?“👗”:“🧺”}</span>
<div style={{fontSize:12,fontFamily:F,color:C.ink}}>{iou.borrower===“You”?(iou.returnPref===“unlaundered”?`${iou.owner.split(" ")[0]} says unlaundered is fine — they'll wash it!`:`${iou.owner.split(" ")[0]} asks you return this freshly washed.`):(iou.returnPref===“unlaundered”?“Your preference: unlaundered return OK”:“Your preference: please return clean”)}</div>
</div>
{iou.borrower!==“You”&&<Btn small variant=“success” onClick={()=>setIous(p=>p.filter(x=>x.id!==iou.id))}>✓ Mark Returned</Btn>}
</div>
))}
</div>
);
}

// ═══════════════════════════════════════════════════════════════════
// ROOT APP — wired with group access enforcement, SMS invite, IM chat
// ═══════════════════════════════════════════════════════════════════
export default function App() {
const [screen,setScreen]=useState(“legal”);
const [tab,setTab]=useState(“home”);
const [groups,setGroups]=useState(INIT_GROUPS);
const [activeGroup,setActiveGroup]=useState(null);
const [selectedItem,setSelectedItem]=useState(null);
const [viewingMyCloset,setViewingMyCloset]=useState(false);
const [livePush,setLivePush]=useState(null);
const [joinSuccessMsg,setJoinSuccessMsg]=useState(””);

useEffect(()=>{
if(screen!==“app”) return;
const delays=[4000,13000,24000];
const timers=delays.map((d,i)=>setTimeout(()=>setLivePush(PUSH_NOTIFS[i]),d));
return()=>timers.forEach(clearTimeout);
},[screen]);

const handleGroupSelect=(g)=>{ if(g===“create”) setActiveGroup(“create”); else if(g&&g.members?.includes(ME.id)) setActiveGroup(g); };
const handleGroupCreate=(newGroup)=>{ setGroups(prev=>[…prev,newGroup]); setTimeout(()=>setActiveGroup(null),3500); };

// Join by code — adds ME to the group’s member list if code matches
const handleJoinByCode=(code,foundGroup)=>{
setGroups(prev=>prev.map(g=>g.id===foundGroup.id&&!g.members.includes(ME.id)?{…g,members:[…g.members,ME.id],activity:`${ME.name} joined · just now`}:g));
setJoinSuccessMsg(`You joined ${foundGroup.name}! 🎉`);
setTimeout(()=>setJoinSuccessMsg(””),4000);
};

const unreadCount=PUSH_NOTIFS.filter(n=>n.unread).length;
const TABS=[{id:“home”,label:“Home”,icon:“🏠”},{id:“style”,label:“Style”,icon:“📸”},{id:“tracker”,label:“Tracker”,icon:“🔄”},{id:“closet”,label:“Mine”,icon:“👗”}];

if(screen===“legal”) return <div style={{maxWidth:430,margin:“0 auto”,minHeight:“100vh”,fontFamily:F}}><LegalFlow onComplete={()=>setScreen(“app”)}/></div>;
if(activeGroup===“create”) return <CreateGroup onBack={()=>setActiveGroup(null)} onCreate={handleGroupCreate}/>;
if(activeGroup&&typeof activeGroup===“object”&&activeGroup.members?.includes(ME.id)) return(
<div style={{maxWidth:430,margin:“0 auto”,minHeight:“100vh”,background:C.bg,overflowY:“auto”}}>
{selectedItem&&<ItemModal item={selectedItem} onClose={()=>setSelectedItem(null)}/>}
<GroupDetail group={activeGroup} onBack={()=>setActiveGroup(null)} onItemSelect={setSelectedItem} allGroups={groups}/>
</div>
);
if(viewingMyCloset) return(
<div style={{maxWidth:430,margin:“0 auto”,minHeight:“100vh”,background:C.bg,overflowY:“auto”}}>
{selectedItem&&<ItemModal item={selectedItem} onClose={()=>setSelectedItem(null)}/>}
<MyCloset onItemSelect={setSelectedItem} onBack={()=>setViewingMyCloset(false)} groups={groups}/>
</div>
);

return(
<div style={{maxWidth:430,margin:“0 auto”,minHeight:“100vh”,background:C.bg,fontFamily:F}}>
{livePush&&<PushToast notif={livePush} onDismiss={()=>setLivePush(null)}/>}

```
  {/* Join success toast */}
  {joinSuccessMsg&&(
    <div style={{position:"fixed",top:14,left:"50%",transform:"translateX(-50%)",background:C.sage,borderRadius:16,padding:"12px 20px",zIndex:999,boxShadow:`0 8px 32px ${C.sage}55`,fontFamily:M,fontWeight:800,fontSize:14,color:"white",animation:"slideDown .3s ease"}}>
      {joinSuccessMsg}
    </div>
  )}

  {/* Header */}
  <div style={{background:C.ink,padding:"14px 20px 12px",position:"sticky",top:0,zIndex:200,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
    <div style={{display:"flex",alignItems:"center",gap:10}}>
      <span style={{fontSize:26,fontWeight:900,color:C.yellow,fontFamily:F,letterSpacing:-1}}>swap</span>
      <span style={{fontSize:10,color:C.muted,letterSpacing:2.5,textTransform:"uppercase",fontFamily:M}}>✦ share the vibe</span>
    </div>
    <div style={{position:"relative",cursor:"pointer"}}>
      <span style={{fontSize:22}}>🔔</span>
      {unreadCount>0&&<div style={{position:"absolute",top:0,right:0,background:C.coral,color:"white",fontSize:9,fontWeight:800,width:17,height:17,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:M}}>{unreadCount}</div>}
    </div>
  </div>

  <div style={{paddingBottom:80}}>
    {tab==="home"    && <HomeFeed groups={groups} onGroupSelect={handleGroupSelect} onItemSelect={setSelectedItem} onOpenMyCloset={()=>setViewingMyCloset(true)} onJoinByCode={handleJoinByCode}/>}
    {tab==="style"   && <StyleFeed userAge="13to17"/>}
    {tab==="tracker" && <Tracker/>}
    {tab==="closet"  && <MyCloset onItemSelect={setSelectedItem} groups={groups}/>}
  </div>

  <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:C.ink,display:"flex",zIndex:200,borderTop:"2px solid rgba(255,255,255,.06)"}}>
    {TABS.map(t=>(
      <button key={t.id} onClick={()=>{setTab(t.id);setActiveGroup(null);setViewingMyCloset(false);}} style={{flex:1,background:"none",border:"none",padding:"10px 4px 9px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
        <span style={{fontSize:19}}>{t.icon}</span>
        <span style={{fontSize:9,fontWeight:tab===t.id?800:500,color:tab===t.id?C.yellow:C.muted,fontFamily:M}}>{t.label}</span>
        {tab===t.id&&<div style={{width:16,height:2,background:C.yellow,borderRadius:1}}/>}
      </button>
    ))}
  </div>
  {selectedItem&&<ItemModal item={selectedItem} onClose={()=>setSelectedItem(null)}/>}
</div>
```

);
}
