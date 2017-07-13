import colors from 'configs/colors'
import fontSizes from 'configs/fontSizes'
import fontFamilies from 'configs/fontFamilies'

const colorStyles = {}
const bgColorStyles = {}
const fontSizeStyles = {}
const fontFamilyStyles = {}

colors.forEach((color, index) => {
  colorStyles['COLOR-' + index] = { color }
  bgColorStyles['BGCOLOR-' + index] = { backgroundColor: color }
})

fontSizes.forEach((fontSize) => {
  fontSizeStyles['FONTSIZE-' + fontSize] = { fontSize: fontSize }
})

fontFamilies.forEach((fontFamily, index) => {
  fontFamilyStyles['FONTFAMILY-' + index] = {
    fontFamily: fontFamily.family
  }
})

const styles = {
  'SUPERSCRIPT': {
    position: 'relative',
    top: '-8px',
    fontSize: '11px'
  },
  'SUBSCRIPT': {
    position: 'relative',
    bottom: '-8px',
    fontSize: '11px'
  },
  'TEXTALIGN-LEFT': {
    textAlign: 'left'
  },
  'TEXTALIGN-CENTER': {
    textAlign: 'center'
  },
  'TEXTALIGN-RIGHT': {
    textAlign: 'right'
  },
  'TEXTALIGN-JUSTIFY': {
    textAlign: 'justify'
  },
  ...colorStyles,
  ...bgColorStyles,
  ...fontSizeStyles,
  ...fontFamilyStyles
}

export default styles