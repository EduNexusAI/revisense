# 🎨 Splash Screen - Quick Reference

## 📦 Files Created

```
fontend/
├── capacitor.config.json           ← Capacitor base config
├── splash-screen-config.json       ← Advanced animation config (USE THIS!)
├── SPLASH_SCREEN_GUIDE.md          ← Complete implementation guide
└── src/
    └── hooks/
        └── useSplashScreen.ts      ← React hook for splash screen
```

---

## 🚀 Quick Start (5 mins)

### 1. Install Capacitor

```bash
cd fontend
npm install @capacitor/core @capacitor/cli @capacitor/splash-screen
npx cap init
npx cap add ios
npx cap add android
```

### 2. Use in React

```typescript
// App.tsx
import { useSplashScreen } from './hooks/useSplashScreen';

export default function App() {
  useSplashScreen(); // Add this line!
  return <YourApp />;
}
```

### 3. Build & Deploy

```bash
npm run build
npx cap sync
npx cap open ios    # or: npx cap open android
```

---

## 🎬 Animation Overview

| Platform | Light Mode | Dark Mode | Duration |
|----------|-----------|-----------|----------|
| **iOS** | Gradient Fade Slide | Neon Glow Ascend | 3000ms |
| **Android** | Material Hero | Dark Mode Reveal | 3200ms |

### Light Mode Effects
✓ Logo fade + scale
✓ Text slide up
✓ Progress bar expand
✓ Glow pulse
✓ 8-12 particles

### Dark Mode Effects
✓ Neon glow effects
✓ Cosmic drift particles
✓ Circle mask reveal (Android)
✓ Shimmer/ripple effects
✓ 15-20 particles

---

## 🎨 Colors

```json
{
  "light": {
    "background": "#FFFFFF",
    "foreground": "#0E0D08",
    "primary": "#3B82F6"
  },
  "dark": {
    "background": "#0E0D08",
    "foreground": "#FFFFFF",
    "primary": "#3B82F6"
  }
}
```

---

## 📱 Implementation Links

| Platform | File | Status |
|----------|------|--------|
| **React** | `src/hooks/useSplashScreen.ts` | ✅ Ready to use |
| **iOS** | `capacitor.config.json` | ✅ Configured |
| **Android** | `capacitor.config.json` | ✅ Configured |
| **Web Fallback** | CSS animations | 📝 Optional |

---

## 🔧 Customization Examples

### Change Primary Color

```json
// splash-screen-config.json
{
  "configuration": {
    "colors": {
      "primary": "#FF6B6B"  // Your color
    }
  }
}
```

### Increase Animation Duration

```json
{
  "configuration": {
    "general": {
      "displayDuration": 4000  // 4 seconds instead of 3
    }
  }
}
```

### More Particles

```json
{
  "particles": {
    "count": 30  // More particles
  }
}
```

---

## ✅ Testing Checklist

- [ ] iOS Light Mode: Logo fade in smoothly?
- [ ] iOS Dark Mode: Neon glow visible?
- [ ] Android Light Mode: Hero animation smooth?
- [ ] Android Dark Mode: Reveal animation looks good?
- [ ] Spinner shows during loading?
- [ ] Fades out after DOMContentLoaded?
- [ ] Works on low-end devices?

---

## 📊 Performance

- **Animation Duration:** 3000-3200ms (optimized for DOMContentLoaded)
- **GPU Rendering:** Enabled by default
- **Particle Count:** 8-20 depending on platform (configurable)
- **File Size:** ~2KB (JSON config)

---

## 🎯 Advanced Features

### Particle Systems
- **iOS Light:** Floating particles with sine-wave path
- **iOS Dark:** Cosmic drift with glow + trail
- **Android Light:** Bubble particles with float-and-pop
- **Android Dark:** Neon sparks with explosion effect

### Special Effects
- **Neon Glow:** 0 → 20px drop shadow pulse
- **Gradient Bar:** Linear gradient sweep (left-to-right)
- **Shimmer:** Light shimmer across screen
- **Circle Mask:** Expanding circle reveal (Android only)

### Animation Easing Functions
- **iOS:** `cubic-bezier(0.25, 0.46, 0.45, 0.94)` (smooth)
- **Android:** `cubic-bezier(0.4, 0, 0.2, 1)` (material)

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| Splash doesn't show | Check `capacitor.config.json` for correct settings |
| Animation laggy | Disable `useAnimationFrames` or reduce particle count |
| Logo blurry | Ensure 2x/3x assets for high DPI devices |
| Fades too fast | Increase `fadeDuration` value |
| Still showing on app | Reduce `displayDuration` value |

---

## 📚 Full Documentation

See **SPLASH_SCREEN_GUIDE.md** for:
- Detailed timeline breakdown
- iOS/Android native code examples
- Xcode & Android Studio setup
- SVG/drawable creation guide
- Performance optimization tips

---

## 🚀 Next Steps

1. ✅ Review `splash-screen-config.json` (already created)
2. ✅ Install Capacitor (`npm install...`)
3. ✅ Add `useSplashScreen()` to App.tsx
4. ✅ Build and sync (`npm run build && npx cap sync`)
5. ✅ Test on iOS device
6. ✅ Test on Android device
7. ✅ Customize colors/animations as needed
8. ✅ Deploy to App Store/Google Play

---

**Version:** 2.0 Professional
**App:** ReViSense.Ai
**Created:** March 24, 2026
