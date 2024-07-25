import React from "react";
import { Draggable } from "react-beautiful-dnd";

const DraggableItem = ({
  item,
  index,
  getItemStyle,
  source,
  onSelect,
  isSelected,
}) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={getItemStyle(
            snapshot.isDragging,
            item.id,
            source,
            snapshot.draggingOver
          )}
          onClick={() => onSelect(item.id)}
          style={{
            ...provided.draggableProps.style,
            cursor: "pointer",
            backgroundColor: isSelected ? "#93c5fd" : "",
          }}
        >
          {item.content}
        </div>
      )}
    </Draggable>
  );
};

export default DraggableItem;
