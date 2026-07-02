# Bug Report

## Critical Issues

### 1. **Hidden Cursor with No Fallback** ⚠️
**File:** [css/main.css](css/main.css#L45)  
**Issue:** `body { cursor: none; }` completely hides the native cursor. If the custom cursor JavaScript fails, users will have no visible cursor at all.
```css
body {
  cursor: none;  /* ← This removes ALL cursors */
}
```
**Fix:** Change to `cursor: auto;` as a fallback.

---

### 2. **LocalStorage Image Size Limit**
**File:** [js/main.js](js/main.js#L217-L225)  
**Issue:** The profile picture upload stores full base64-encoded images in localStorage. This can easily exceed the ~5MB limit per domain in most browsers.
```javascript
const data = ev.target.result;  // Full base64 image
localStorage.setItem('sahil_pfp', data);  // Can exceed limit!
```
**Fix:** Consider reducing image size, compressing, or using IndexedDB instead.

---

### 3. **Incomplete Social Links**
**File:** [js/components.js](js/components.js)  
**Issues:**
- GitHub link: `https://github.com/` → Should be `https://github.com/sahiliitj`
- Twitter link: `https://twitter.com/` → Needs user handle  
- Google Scholar: `https://scholar.google.com/` → Needs specific profile URL

---

### 4. **Memory Leak: Typing Effect**
**File:** [js/main.js](js/main.js#L235-L250)  
**Issue:** The typing effect sets up multiple `setTimeout` calls but never clears them if the page is navigated away or destroyed.
```javascript
function initTypingEffect(el, texts, speed = 80) {
  // ... 
  setTimeout(tick, del ? speed/2 : speed);  // ← No cleanup!
}
```
**Fix:** Store timeout IDs and clear them in a cleanup function.

---

### 5. **Missing Fallback for Custom Cursor**
**File:** [js/main.js](js/main.js#L72-L84)  
**Issue:** `initCursor()` returns silently if cursor elements don't exist. If `document.write()` fails, there's no warning or fallback.
```javascript
function initCursor() {
  const c = document.getElementById('cursor');
  const r = document.getElementById('cursor-ring');
  if (!c || !r) return;  // ← Silent failure
  // ...
}
```
**Fix:** Log console warning or ensure elements are always created.

---

### 6. **Broken Navigation Links in Custom Pages**
**File:** [js/main.js](js/main.js#L127-135)  
**Issue:** Custom page links use hardcoded prefix but may break on nested routes.
```javascript
a.href = `pages/custom_${p.id}.html`;  // Assumes pages/ exists
```
**Fix:** Use consistent path resolution or relative URLs.

---

## Minor Issues

### 7. **No Error Handling in FileReader**
**File:** [js/main.js](js/main.js#L217)  
**Issue:** FileReader has no error callback.
```javascript
const reader = new FileReader();
reader.onload = ...  // Only handles success
reader.readAsDataURL(file);
```

### 8. **Console Logging in Production**
**File:** [js/main.js](js/main.js#L165)  
```javascript
console.log('Custom page data:', page);  // Debug code left in
```

---

## Recommendations

1. ✅ Change cursor fallback from `none` to `auto`
2. ✅ Compress images before localStorage or use IndexedDB
3. ✅ Update all social media links with actual profiles
4. ✅ Add cleanup function for typing effect timeouts
5. ✅ Add error handling for all async operations
6. ✅ Remove console.log debug statements
7. ✅ Add defensive checks for DOM elements
