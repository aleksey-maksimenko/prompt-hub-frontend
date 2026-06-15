import type {
  InlineToken,
} from "../../parser/tokenTypes";

type Props = {
  tokens: InlineToken[];
};

export const InlineRenderer = ({
  tokens,
}: Props) => {
  return (
    <>
      {tokens.map((token, index) => {
        switch (token.type) {
          case "text":
            return (
              <span key={index}>
                {token.value}
              </span>
            );

          case "variable":
            return (
              <span
                key={index}
                className="token-variable"
              >
                {`{{${token.value}}}`}
              </span>
            );

          case "code":
            return (
              <code
                key={index}
                className="token-code"
              >
                {token.value}
              </code>
            );
          case "caps":
            return (
              <span
                key={index}
                className="token-caps"
              >
                {token.value}
              </span>
            );
          case "metaglyph":
            return (
              <span
                key={index}
                className="token-metaglyph"
              >
                {token.value}
              </span>
            );
            case "xmlTag":
              return (
                <span
                  key={index}
                  className="token-xml"
                >
                  {token.value}
                </span>
            );
            case "bold":
              return (
                <span
                  key={index}
                  className="token-bold"
                >
                  {`**${token.value}**`}
                </span>
              );
            case "italic":
              return (
                <span
                  key={index}
                  className="token-italic"
                >
                  {`*${token.value}*`}
                </span>
            );
          default:
            return null;
        }
      })}
    </>
  );
}