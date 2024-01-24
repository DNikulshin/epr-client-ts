export  const regExpSortTel = /(?:\+|\d)[\d\-() ]{9,}\d/g
export  const regExpSortDescription = /(<(\/?[^>]+)>)/g
export const replaceSpecialSymbols = (str: string) => {
  if (str) {
    return str.replace(/^\s+/g, ' ')
      .replace('&#047;', '/')
      .replace('&#092;', '/')
      .replace('&#063;', ':')
      .replace('&#035;', '#')
  }

}
