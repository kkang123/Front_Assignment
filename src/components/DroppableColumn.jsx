import React from "react";
import { Droppable } from "react-beautiful-dnd";
import DraggableItem from "./DraggableItem";

const DroppableColumn = ({
  columnId,
  columnData,
  getListStyle,
  getItemStyle,
  addItem,
  selectedItems,
  onItemSelect,
}) => {
  return (
    <div className="m-4">
      <h3 className="text-lg font-semibold text-center">{columnData.name}</h3>

      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`border-2 border-green-700 rounded-lg ${getListStyle(
              snapshot.isDraggingOver
            )} flex flex-col w-64`}
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <div className="flex-1 p-2 overflow-y-auto flex flex-col">
              {columnData.items.map((item, index) => (
                <DraggableItem
                  key={item.id}
                  item={item}
                  index={index}
                  getItemStyle={getItemStyle}
                  source={{ droppableId: columnId, index }}
                  onSelect={onItemSelect}
                  isSelected={selectedItems.includes(item.id)}
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
    </div>
  );
};

export default DroppableColumn;
