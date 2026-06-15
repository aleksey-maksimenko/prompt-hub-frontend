import {
  toolbarActions,
  type ToolbarActionId,
} from "./toolbarActions";

type Props = {
  onAction: (
    action: ToolbarActionId
  ) => void;
};

export const Toolbar = ({
  onAction,
}: Props) => {
  return (
    <div className="toolbar">
      {toolbarActions.map((action) => (
        <button
          key={action.id}
          type="button"
          title={action.title}
          onClick={() =>
            onAction(action.id)
          }
        >
          {action.label}
        </button>
      ))}
    </div>
  );
};