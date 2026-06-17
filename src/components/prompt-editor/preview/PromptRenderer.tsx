import { InlineRenderer } from "./InlineRenderer";
import type { BlockToken } from "../../../parser/tokenTypes";

type Props = {
  tokens: BlockToken[];
};

export const PromptRenderer = ({ tokens }: Props) => {
  return (
    <>
      {tokens.map((token, index) => {
        switch (token.type) {
          case "heading":
            return <h2 key={index}>{token.value}</h2>;
          case "divider":
            return <hr key={index} />;
          case "paragraph":
            return (
              <p key={index}>
                <InlineRenderer tokens={token.children} />
              </p>
            );
          case "decorator":
            return (
              <div key={index} className="token-decorator">
                +++{token.value}
              </div>
            );
          case "codeBlock":
            return (
              <pre key={index} className="token-code-block">
                <code>{token.content}</code>
              </pre>
            );
          case "emptyLine":
            return <div key={index} className="empty-line" />;
          default:
            return null;
        }
      })}
    </>
  );
};