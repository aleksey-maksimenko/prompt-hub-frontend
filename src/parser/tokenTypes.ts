export type InlineToken =
  | {
      type: "text";
      value: string;
    }
  | {
      type: "variable";
      value: string;
    }
  | {
      type: "code";
      value: string;
    }
  | {
      type: "caps";
      value: string;
    }
  | {
      type: "metaglyph";
      value: string;
    }
  | {
       type: "xmlTag";
       value: string;
    }
  | {
      type: "italic";
      value: string;
    }
  | {
       type: "bold";
       value: string;
    }
    ;

export type BlockToken =
  | {
      type: "heading";
      value: string;
    }
  | {
      type: "divider";
    }
  | {
      type: "decorator";
      value: string;
    }
  | {
      type: "paragraph";
      children: InlineToken[];
    }
  | {
      type: "codeBlock";
      language: string;
      content: string;
    }
  | {
      type: "emptyLine";
    }
  ;