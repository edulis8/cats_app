# 🐱 Cats App

A fun, interactive React app for browsing and managing adorable cat photos!

## Features

- 🎉 **Get Random Cats** - Fetch random cat images from TheCatAPI
- 💾 **Save to Stack** - Keep your favorite cats in a stack on the left
- ✕ **Reject Cats** - Send cats to trash if you don't like them
- 🗑️ **Trash System** - Manage deleted cats and restore them
- ✨ **Sparkles Effect** - Magical sparkles when you get a new cat
- 📱 **Mobile Friendly** - Fully responsive design for all devices
- 🎨 **Beautiful UI** - Purple gradient background with smooth animations

## Getting Started

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser!

### Build for Production

```bash
npm run build
```

## How to Use

1. **Get a Cat** - Click "Get Another Cat" to load a random cat image
2. **Save to Stack** - Click "Save to Stack" to keep the current cat in your collection
3. **Reject** - Click "Reject" to delete the current cat to trash and get a new one
4. **Manage Your Stack**:
   - Click the trash 🗑️ button on a stacked cat to delete it
   - Drag and drop cats to the trash area (desktop)
5. **Open Trash** - Click the trash counter to view and restore deleted cats
6. **Restore Cats** - Hover over trashed cats and click "Restore" to add them back to your stack

## Stack

- **React 19** - UI framework
- **Vite** - Fast build tool
- **TheCatAPI** - Source of cat images
- **CSS3** - Beautiful animations and responsive design

## Project Structure

```
src/
├── pages/
│   └── Cat.jsx          # Main cat app component
├── styles/
│   └── Cat.css          # All styling and animations
├── App.jsx              # Root app component
├── index.css            # Global styles
└── main.jsx             # Entry point
```

## API

This app uses the free **[TheCatAPI](https://thecatapi.com)** to fetch random cat images.

## License

MIT - Feel free to use this project however you like!

## Enjoy! 🐱✨

Share your favorite cats with friends!
