export  const regExpSortTel = /(?:\+|\d)[\d\-() ]{9,}\d/g
//export  const regExpSortDescription = /(<(\/?[^>]+)>)/g
export const replaceSpecialSymbols = (str: string | undefined) => {
  if (str) {
    return str
      .replace(/(<(\/?[^>]+)>)/g, ' ')
      .replace(/^\s+/g, ' ')
      .replace('&#047;', '/')
      .replace('&#092;', '/')
      .replace('&#063;', ':')
      .replace('&#035;', '#')
  }

}
