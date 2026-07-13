# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.


// ----


Based on the design patterns implemented across your two high-end dashboards, here is a highly detailed, professional prompt. It perfectly synthesizes your unique aesthetic styling choices, structural choices, and layout metrics into a reusable instruction set for future UI designs.

---

### **Prompt: Ultra-Luxury Dark-Themed Mobile UI Architecture**

**Objective:** Design a premium, high-end React Native screen utilizing an advanced, ultra-luxury dark mode design pattern. The aesthetic focuses on depth, asymmetry, micro-interactions, clean structural grids, and elegant spacing to elevate utility into an executive experience.

#### **1. Core Theme & Visual Palette (Glassmorphism & Depth)**

* **Base Canvas:** A deep, monolithic background tone (`#000000` or ultra-dark grey) combined with structured layout blocks (`darkTheme.colors.card`).
* **Contrast Layering:** Avoid harsh solid borders. Use translucent, ultra-fine separator rules and structural wrappers via subtle RGBA tints:
* *Borders / Containers:* `rgba(255, 255, 255, 0.04)` to `rgba(255, 255, 255, 0.05)`.
* *Faux Glass Backgrounds:* `rgba(255, 255, 255, 0.02)` to `rgba(255, 255, 255, 0.03)`.


* **Vibrant Accent:** Introduce a single premium accent tone (e.g., a warm luxury Amber/Gold or high-contrast Orange). Use it sparingly for primary call-to-actions, highlight nodes, and critical state indicators. For passive accents, dilute it to an ultra-soft tint (e.g., `rgba(255, 149, 0, 0.05)` or `0.15`).

#### **2. Typography & Text Hierarchy**

* **Title Layers:** High-contrast white (`#FFFFFF`) with heavy weight (`700`), accompanied by compact letter-spacing (`-0.1`) to emphasize sleek, modern formatting.
* **Subtext & Meta Layers:** Muted gray shades (`#AEAEB2` or `darkTheme.colors.textMuted`). Use lower font weights (`600` or `500`), lower font scales, or lower visual opacity (`0.35` to `0.6`) to clearly separate system meta-data from main core components.
* **Upper-Case Scaling:** Use full uppercase treatments strictly for hyper-functional status metadata badges or structural label titles (e.g., `SERVICE`, `ASSIGNED STYLIST`) downscaled to small text frames (`scale(9)`) with expanded tracking (`letterSpacing: 0.5`).

#### **3. Responsive Layout Scaling & Micro-Spacing Metrics**

* **Sizing Engine:** Utilize structural scale engines exclusively (`react-native-size-matters`). All font sizes, widths, and horizontal margins must employ horizontal `scale(...)`. All component heights, padding blocks, and row gaps must employ `verticalScale(...)`.
* **Layout Enclosures:** Standardized page framing (`darkTheme.layout.paddingHorizontal`) running down to list nodes separated strictly via predictable spacing matrices (`verticalScale(10)` to `verticalScale(12)`).
* **Inter-Element Spacing:** Maintain a precise gap hierarchy inside card modules:
* *Sub-element clusters:* `verticalScale(2)` to `verticalScale(4)`.
* *Component section separators:* `verticalScale(12)` to `verticalScale(16)`.
* *Action Sheet/Modal base pads:* `verticalScale(24)` to `verticalScale(36)`.



#### **4. Component Architecture Patterns**

* **Asymmetrical Premium Cards:** Multi-segment cards built with three internal sections separated by ultra-fine hairline dividers (`height: 1`).
* *Top:* High-density asymmetrical profile block featuring a structural avatar square (`borderWidth: 1`) juxtaposed beside two lines of text, balanced on the right by a small system status pill badge.
* *Middle:* Financial/Breakdown box showcasing clean rows balancing label parameters left against explicit bold value outcomes right.
* *Bottom:* Left-aligned interaction utility strings wrapped in a soft background capsule tint.


* **Floating Bottom Sheet Modals:** Overlay scrim using a rich transparent layout mask (`rgba(0, 0, 0, 0.7)`). The modal tray is physically anchored to the screen bottom (`justifyContent: 'flex-end'`), using high-arc top corners (`scale(20)`), a centered horizontal drag-handle notch (`width: scale(36), height: verticalScale(4)`), and an explicit split-button row layout for confirming (accent color) vs. dismissing (soft red tint).
* **FlatList Optimization:** Always pass explicit `maxToRenderPerBatch={10}`, `windowSize={5}`, and conditional `removeClippedSubviews` flags to ensure smooth interaction performance. Ensure a custom luxury empty placeholder view is integrated utilizing high-end wireframe iconography.