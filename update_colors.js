const fs = require('fs');

let file = fs.readFileSync('app/page.jsx', 'utf8');

const startIndex = file.indexOf('function CoursesSection() {');
const endIndex = file.indexOf('function ContactSection() {'); // next section, or just EOF if not exists
const actualEnd = endIndex > -1 ? endIndex : file.length;

let pre = file.substring(0, startIndex);
let part = file.substring(startIndex, actualEnd);
let post = file.substring(actualEnd);

// Section bg
part = part.replace(/background:\s*["']#07070f["']/g, 'background: "#ffffff"');

// Glows
part = part.replace(/rgba\(168,85,247,0.07\)/g, 'rgba(168,85,247,0.12)');
part = part.replace(/rgba\(56,189,248,0.05\)/g, 'rgba(56,189,248,0.08)');
part = part.replace(/backgroundImage:\s*"repeating-linear-gradient\(45deg,rgba\(255,255,255,\.9\) 0,rgba\(255,255,255,\.9\) 1px,transparent 0,transparent 50\%\)"/g, 'backgroundImage: "repeating-linear-gradient(45deg,rgba(0,0,0,.04) 0,rgba(0,0,0,.04) 1px,transparent 0,transparent 50%)"');

// Header Text
part = part.replace(/color:\s*["']#f8fafc["']/g, 'color: "#0f172a"');
part = part.replace(/color:\s*["']rgba\(255,255,255,\.45\)["']/g, 'color: "rgba(15,23,42,.65)"');

// Bubble bg
part = part.replace(/linear-gradient\(145deg,\$\{sc\.color\}22 0%,rgba\(12,12,22,\.92\) 100%\)/g, 'linear-gradient(145deg,${sc.color}15 0%,#ffffff 100%)');
part = part.replace(/"rgba\(255,255,255,\.034\)"/g, '"#ffffff"');
part = part.replace(/"rgba\(255,255,255,\.09\)"/g, '"rgba(0,0,0,.08)"');
part = part.replace(/"0 8px 32px rgba\(0,0,0,\.28\),inset 0 1px 0 rgba\(255,255,255,\.05\)"/g, '"0 8px 32px rgba(0,0,0,.06),inset 0 1px 0 rgba(255,255,255,.8)"');
part = part.replace(/color:\s*isActive \? ["']#fff["'] : ["']rgba\(255,255,255,\.8\)["']/g, 'color: isActive ? "#0f172a" : "rgba(15,23,42,.8)"');
part = part.replace(/stroke=\{isActive \? sc\.color : ["']rgba\(255,255,255,\.5\)["']\}/g, 'stroke={isActive ? sc.color : "rgba(15,23,42,.4)"}');

// Search Bar
part = part.replace(/color:\s*inputFocused \? ["']#a855f7["'] : ["']rgba\(255,255,255,\.35\)["']/g, 'color: inputFocused ? "#a855f7" : "rgba(15,23,42,.4)"');
part = part.replace(/background:\s*inputFocused \? ["']rgba\(168,85,247,\.09\)["'] : ["']rgba\(255,255,255,\.05\)["']/g, 'background: inputFocused ? "rgba(168,85,247,.06)" : "#ffffff"');
part = part.replace(/border:\s*`1\.5px solid \$\{inputFocused \? ["']rgba\(168,85,247,\.6\)["'] : ["']rgba\(255,255,255,\.12\)["']\}`/g, 'border: `1.5px solid ${inputFocused ? "rgba(168,85,247,.6)" : "rgba(0,0,0,.08)"}`');
part = part.replace(/background:\s*["']rgba\(255,255,255,\.1\)["']/g, 'background: "rgba(0,0,0,.05)"');
part = part.replace(/color:\s*["']rgba\(255,255,255,\.6\)["']/g, 'color: "rgba(15,23,42,.6)"');
part = part.replace(/e\.currentTarget\.style\.background = ["']rgba\(255,255,255,\.2\)["']/g, 'e.currentTarget.style.background = "rgba(0,0,0,.08)"');
part = part.replace(/e\.currentTarget\.style\.background = ["']rgba\(255,255,255,\.1\)["']/g, 'e.currentTarget.style.background = "rgba(0,0,0,.05)"');

// Expanded Panel
part = part.replace(/linear-gradient\(160deg, \$\{activeData\.color\}08 0%, rgba\(10,10,20,\.96\) 60%\)/g, 'linear-gradient(160deg, ${activeData.color}08 0%, #ffffff 60%)');
part = part.replace(/boxShadow:\s*`0 32px 80px \$\{activeData\.color\}10, inset 0 1px 0 rgba\(255,255,255,\.07\)`/g, 'boxShadow: `0 32px 80px ${activeData.color}15, inset 0 1px 0 rgba(255,255,255,.5)`');
part = part.replace(/background:\s*["']rgba\(255,255,255,\.06\)["']/g, 'background: "rgba(0,0,0,.04)"');
part = part.replace(/border:\s*["']1px solid rgba\(255,255,255,\.12\)["']/g, 'border: "1px solid rgba(0,0,0,.08)"');
part = part.replace(/color:\s*["']rgba\(255,255,255,\.5\)["']/g, 'color: "rgba(15,23,42,.5)"');
part = part.replace(/e\.currentTarget\.style\.background = ["']rgba\(255,255,255,\.12\)["']/g, 'e.currentTarget.style.background = "rgba(0,0,0,.08)"');
part = part.replace(/e\.currentTarget\.style\.color = ["']#fff["']/g, 'e.currentTarget.style.color = "#0f172a"');
part = part.replace(/e\.currentTarget\.style\.background = ["']rgba\(255,255,255,\.06\)["']/g, 'e.currentTarget.style.background = "rgba(0,0,0,.04)"');
part = part.replace(/color:\s*["']rgba\(255,255,255,\.75\)["']/g, 'color: "rgba(15,23,42,.75)"');
part = part.replace(/background:\s*["']rgba\(255,255,255,\.026\)["']/g, 'background: "#f8fafc"');
part = part.replace(/border:\s*["']1px solid rgba\(255,255,255,\.055\)["']/g, 'border: "1px solid rgba(0,0,0,.05)"');
part = part.replace(/e\.currentTarget\.style\.background = ["']rgba\(255,255,255,\.026\)["']/g, 'e.currentTarget.style.background = "#f8fafc"');
part = part.replace(/e\.currentTarget\.style\.borderColor = ["']rgba\(255,255,255,\.055\)["']/g, 'e.currentTarget.style.borderColor = "rgba(0,0,0,.05)"');
part = part.replace(/color:\s*["']rgba\(255,255,255,\.82\)["']/g, 'color: "rgba(15,23,42,.85)"');
part = part.replace(/borderTop:\s*`1px solid rgba\(255,255,255,\.05\)`/g, 'borderTop: `1px solid rgba(0,0,0,.06)`');
part = part.replace(/color:\s*["']rgba\(255,255,255,\.4\)["']/g, 'color: "rgba(15,23,42,.6)"');
part = part.replace(/color:\s*["']#fff["']/g, 'color: "#0f172a"');

fs.writeFileSync('app/page.jsx', pre + part + post);
console.log('Update script finished');
