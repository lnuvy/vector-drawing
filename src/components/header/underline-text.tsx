import { Fragment } from "react/jsx-runtime"

interface UnderlineTextProps {
  text: string
  underWord: string
}

const UnderlineText = ({ text, underWord }: UnderlineTextProps) => {
  return text.split(underWord).map((word, index) => (
    <Fragment key={word}>
      {word}
      {index !== text.split(underWord).length - 1 && <span className="underline">{underWord}</span>}
    </Fragment>
  ))
}

export default UnderlineText
