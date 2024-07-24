import React from "react";
import { Droppable } from "react-beautiful-dnd";
import DraggableItem from "./DraggableItem";

const DroppableColumn = ({
  columnId,
  columnData,
  getListStyle,
  getItemStyle,
  addItem,
}) => {
  return (
    <Droppable droppableId={columnId}>
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={`border-2 border-green-700 rounded-lg ${getListStyle(
            snapshot.isDraggingOver
          )} flex flex-col w-64`}
        >
          <div className="p-2 border-b border-gray-300">
            <h3 className="text-lg font-semibold">{columnData.name}</h3>
          </div>

          <div className="flex-1 p-2 overflow-y-auto">
            {columnData.items.map((item, index) => (
              <DraggableItem
                key={item.id}
                item={item}
                index={index}
                getItemStyle={getItemStyle}
                source={{ droppableId: columnId, index }} // Source 정보 추가
              />
            ))}
            {provided.placeholder}
          </div>

          {addItem && (
            <div className="p-2 border-t border-gray-300 mt-auto">
              <button
                onClick={addItem}
                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              >
                아이템 추가
              </button>
            </div>
          )}
        </div>
      )}
    </Droppable>
  );
};

export default DroppableColumn;
