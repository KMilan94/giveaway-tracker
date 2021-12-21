export const getColorFromGameType = (gameType: string): string => {
    let style;

    switch (gameType) {
      case 'DLC & Loot': style = '#a335ee'; break;
      case 'Full Game': style = '#ff8000'; break;
      case 'Early Access':
      default: style = '#0070dd'; break;
    }

    return style;
}