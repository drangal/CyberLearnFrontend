let currentTheme = 'light'

const themes = {
  light: {
    '--primary-color': 'green'
  },
  dark: {
    '--primary-color': 'red'
  },
  Diluc: {
    '--banner-color1': '#f7b42c',
    '--banner-color2': '#fc575e'
  },
  Layla: {
    '--banner-color1': '#00b3ff',
    '--banner-color2': '#3a92d5'
  },
  Xiao: {
    '--banner-color1': '#52A7C1',
    '--banner-color2': '#6ED1EF'
  }
}

function ChangeLoopColor() {
  let all_themes = Object.keys(themes)
  let num = all_themes.indexOf(currentTheme)
  if (all_themes.length - 1 == num) currentTheme = all_themes[0]
  else currentTheme = all_themes[num + 1]

  let theme = themes[currentTheme]
  for (let key in theme)
    document.documentElement.style.setProperty(key, theme[key])
}

function ChangeColor(color) {
  let theme = themes[color]
  for (let key in theme)
    document.documentElement.style.setProperty(key, theme[key])
}

export { ChangeLoopColor, ChangeColor }
