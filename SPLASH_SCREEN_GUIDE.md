# 🎨 ReViSense.Ai - Professional Splash Screen Configuration

Professional splash screen animations for iOS and Android with advanced effects, particle systems, and smooth transitions.

## 📋 Files Created

### 1. **capacitor.config.json**
Main Capacitor configuration with basic splash screen settings.

### 2. **splash-screen-config.json**
Advanced splash screen configuration with detailed animations for:
- **Light Mode:** Clean, professional fade-slide-glow effects
- **Dark Mode:** Neon glow cosmic effects

---

## 🎬 Animation Features

### **iOS Light Mode: "Gradient Fade Slide"**
- Logo gracefully fades in with scale (0.8 → 1)
- Text slides up from bottom with fade
- Loading bar expands smoothly
- Soft glow pulse around logo
- Floating particles (8 count)
- Subtle gradient background

**Timeline:**
- 0-800ms: Logo fade in + scale
- 400-1200ms: Text slide up
- 1000-2200ms: Loading bar expand
- 1500-3000ms: Glow pulse
- 2800-3200ms: Final fade out
- **Total: 3000ms**

---

### **iOS Dark Mode: "Neon Glow Ascend"**
- Logo appears with neon glow drop-shadow
- Logo ascends (-20px) and glows
- Text appears with neon text shadow
- Gradient bar sweeps left to right
- Pulsing glow effect around content
- 15 cosmic particles with glow + trail
- Cosmic fade with blur effect

**Timeline:**
- 0-600ms: Neon glow appear
- 200-1200ms: Logo ascend animation
- 800-1400ms: Text glow appear
- 1200-2100ms: Gradient bar sweep
- 1500-2800ms: Pulse glow
- 2700-3200ms: Cosmic fade
- **Total: 3000ms**

---

### **Android Light Mode: "Material Hero Transition"**
- Material Design ripple effect from center
- Logo scales + rotates (360°) with hero animation
- Text enters with perspective skew
- Accent bar expands with gradient
- Smooth loading spinner (1 rotation per 2s)
- Shimmer effect across screen
- 12 bubble particles with float-and-pop

**Timeline:**
- 0-1000ms: Material ripple effect
- 300-1400ms: Logo hero scale+rotate
- 900-1600ms: Text entrance with skew
- 1200-2000ms: Accent bar animation
- 1600-3000ms: Loading spinner
- 2000-3200ms: Shimmer effect
- **Total: 3200ms**

---

### **Android Dark Mode: "Dark Mode Reveal"**
- Circle mask reveals content from center
- Neon outline pulses around logo
- Logo glows in with neon effect
- Text appears with neon glow
- Animated gradient lines sweep diagonally
- Ring spinner with neon color
- 20 neon spark particles with explosion+float
- Decorative elements: diagonal lines + accent bar

**Timeline:**
- 0-800ms: Circle mask reveal
- 400-1200ms: Neon outline pulse
- 600-1500ms: Logo neon glow in
- 1100-1800ms: Text neon appear
- 1400-2200ms: Gradient lines sweep
- 1800-3200ms: Loading ring spinner
- 3000-3200ms: Final neon fade
- **Total: 3200ms**

---

## 🎨 Color Scheme

### Light Mode
- **Background:** `#FFFFFF` (Clean white)
- **Foreground:** `#0E0D08` (Dark text)
- **Accents:** Blue `#3B82F6`, Green `#10B981`, Amber `#F59E0B`

### Dark Mode
- **Background:** `#0E0D08` (Deep dark)
- **Foreground:** `#FFFFFF` (White text)
- **Accents:** Blue `#3B82F6`, Pink `#EC4899`, Green `#10B981`

---

## 🚀 Implementation Guide

### **Step 1: Install Capacitor (if not already installed)**

```bash
cd fontend
npm install @capacitor/core @capacitor/cli
npm install @capacitor/splash-screen
```

### **Step 2: Initialize Capacitor**

```bash
npx cap init
```

When prompted:
- App name: `ReViSense`
- App Package ID: `ai.revisense.app`
- Web dir: `dist`

### **Step 3: Add Platforms**

```bash
npx cap add ios
npx cap add android
```

### **Step 3: Configure Splash Screen in React**

Create `src/hooks/useSplashScreen.ts`:

```typescript
import { useEffect } from 'react';
import { SplashScreen } from '@capacitor/splash-screen';
import splashConfig from '../../splash-screen-config.json';

export const useSplashScreen = () => {
  useEffect(() => {
    const hideSplash = async () => {
      try {
        // Simulate app loading
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Hide splash screen with fade
        await SplashScreen.hide({
          fadeOutDuration: 300,
        });
      } catch (error) {
        console.error('Error hiding splash screen:', error);
      }
    };

    // Check if running on mobile or web
    if (window.Capacitor && window.Capacitor.isNative) {
      hideSplash();
    }
  }, []);
};
```

Use in your main App component:

```typescript
import { useSplashScreen } from './hooks/useSplashScreen';

export default function App() {
  useSplashScreen(); // Hide splash after DOM loaded

  return (
    // Your app content
  );
}
```

### **Step 4: Build for Mobile**

```bash
# Build web first
npm run build

# Update native apps
npx cap copy
npx cap sync

# Open in native IDEs
npx cap open ios
npx cap open android
```

---

## 📱 iOS Setup (Xcode)

### Generate Splash Screen Assets

1. **Extract splash-screen-config.json** animations to Xcode
2. **Create LaunchScreen.storyboard** with animations
3. **Add to Xcode project:**
   - Storyboard animation configurations
   - Neon glow effects using CADisplayLink
   - Particle system setup

### Example: Implementing Neon Glow in Swift

```swift
import UIKit

class SplashViewController: UIViewController {
    private let logoView = UIImageView()
    private let glowView = UIView()

    override func viewDidLoad() {
        super.viewDidLoad()
        setupNeonGlow()
    }

    private func setupNeonGlow() {
        // Logo with neon shadow
        logoView.layer.shadowColor = UIColor(red: 0.23, green: 0.51, blue: 0.96, alpha: 1).cgColor // #3B82F6
        logoView.layer.shadowOffset = CGSize(width: 0, height: 0)
        logoView.layer.shadowOpacity = 0.8
        logoView.layer.shadowRadius = 20
        logoView.layer.shouldRasterize = true

        // Animate glow
        let glowAnimation = CABasicAnimation(keyPath: "shadowOpacity")
        glowAnimation.fromValue = 0.3
        glowAnimation.toValue = 0.8
        glowAnimation.duration = 1.5
        glowAnimation.autoreverses = true
        glowAnimation.repeatCount = .infinity
        logoView.layer.add(glowAnimation, forKey: "glowPulse")
    }
}
```

---

## 🤖 Android Setup (Android Studio)

### Create Splash Activity

1. **Create `SplashActivity.kt`:**

```kotlin
import android.Manifest
import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import androidx.appcompat.app.AppCompatActivity
import com.revisense.R

class SplashActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_splash)

        // Hide splash after 3200ms (matching animation duration)
        Handler(Looper.getMainLooper()).postDelayed({
            startActivity(Intent(this, MainActivity::class.java))
            finish()
        }, 3200)
    }
}
```

2. **Create `res/layout/activity_splash.xml`:**

```xml
<?xml version="1.0" encoding="utf-8"?>
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/splash_bg_dark">

    <!-- Background Gradient -->
    <View
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:background="@drawable/splash_gradient_bg" />

    <!-- Decorative Lines -->
    <View
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:background="@drawable/splash_diagonal_lines" />

    <!-- Center Container -->
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:gravity="center"
        android:orientation="vertical">

        <!-- Logo with Glow -->
        <ImageView
            android:id="@+id/splash_logo"
            android:layout_width="120dp"
            android:layout_height="120dp"
            android:src="@drawable/ic_logo"
            android:contentDescription="App Logo" />

        <!-- App Name -->
        <TextView
            android:id="@+id/splash_text"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="ReViSense.Ai"
            android:textSize="28sp"
            android:textStyle="bold"
            android:textColor="@color/white"
            android:layout_marginTop="24dp"
            android:shadowColor="@color/neon_blue"
            android:shadowDx="0"
            android:shadowDy="0"
            android:shadowRadius="10" />

        <!-- Loading Spinner -->
        <ProgressBar
            android:id="@+id/splash_spinner"
            android:layout_width="50dp"
            android:layout_height="50dp"
            android:layout_marginTop="48dp"
            android:indeterminate="true"
            android:indeterminateTint="@color/neon_blue" />
    </LinearLayout>

    <!-- Top Accent Bar -->
    <View
        android:layout_width="match_parent"
        android:layout_height="4dp"
        android:background="@drawable/gradient_accent_bar" />
</FrameLayout>
```

3. **Create `res/drawable/splash_gradient_bg.xml`:**

```xml
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <gradient
        android:startColor="#0E0D08"
        android:endColor="#1A1915"
        android:angle="45" />
</shape>
```

---

## 🎯 Performance Optimization

### Recommended Settings

```json
{
  "performance": {
    "useHardwareAcceleration": true,
    "enableGPURendering": true,
    "optimizeForLowEndDevices": false,
    "useAnimationFrames": true
  }
}
```

### Load Optimization
- Particle count: **iOS 8-15**, **Android 12-20** (lower on low-end devices)
- Animation duration: **3000-3200ms** (optimal DOMContentLoaded timing)
- GIF/PNG: Use **vector graphics** for better performance

---

## 📊 Configuration Export

These configurations are compatible with:

✅ **Capacitor 5.x+**
✅ **React + Vite**
✅ **Ionic Framework**
✅ **Flutter (with adaptation)**
✅ **Native Swift/Kotlin** (manual implementation)

---

## 🔄 Using the Configuration

### Load and Apply in React

```typescript
import splashConfig from '../splash-screen-config.json';

export function getSplashAnimation(mode: 'light' | 'dark', platform: 'ios' | 'android') {
  return splashConfig.splashScreens[mode][platform];
}

// Usage
const iosLightAnimation = getSplashAnimation('light', 'ios');
const androidDarkAnimation = getSplashAnimation('dark', 'android');
```

---

## 🎬 Animation Preview

### Timeline Visualization

```
iOS Light Mode (3000ms):
|--0-800--|--400-1200--|--1000-2200--|--1500-3000--|--2800-3200--|
 Logo In   Text Up     Progress    Pulse        Fade Out

Android Dark Mode (3200ms):
|--0-800--|--400-1200--|--600-1500--|--1100-1800--|--1800-3200--|
 Mask     Outline     Logo Glow   Text        Spinner
```

---

## 🔧 Customization

### Modify Colors

Edit `splash-screen-config.json`:

```json
{
  "configuration": {
    "colors": {
      "primary": "#3B82F6",      // Change primary color
      "success": "#10B981",      // Change success color
      "lightBackground": "#FFFFFF" // Change light BG
    }
  }
}
```

### Adjust Animation Duration

```json
{
  "display Duration": 3500,  // Increase display time
  "fadeDuration": 500       // Longer fade out
}
```

### Change Particle Count

```json
{
  "particles": {
    "count": 20,  // More particles for more visual effect
    "glowEffect": true
  }
}
```

---

## 📝 Deployment Notes

- **iOS:** Use the `splash-screen-config.json` values in LaunchScreen.storyboard
- **Android:** Update `res/values/colors.xml` and animation XMLs
- **Web:** Fallback to CSS animations in `index.html` (optional)
- **Test:** Run on both devices to ensure smooth animations

---

## ✅ Checklist

- [ ] Copy `splash-screen-config.json` to project root
- [ ] Update `capacitor.config.json` with values
- [ ] Install `@capacitor/splash-screen` package
- [ ] Create native splash implementations (iOS/Android)
- [ ] Test on iOS device
- [ ] Test on Android device
- [ ] Verify DOMContentLoaded timing
- [ ] Deploy to App Store/Google Play

---

## 📞 Support

For issues or customizations, reference:
- [Capacitor Splash Screen Docs](https://capacitorjs.com/docs/apis/splash-screen)
- [iOS Animation Guide](https://developer.apple.com/documentation/uikit/animation)
- [Android Animation Guide](https://developer.android.com/guide/topics/graphics/prop-animation)

---

**Configuration Version:** 2.0
**Last Updated:** March 24, 2026
**App:** ReViSense.Ai
