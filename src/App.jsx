import React, { useState, useCallback } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import DroppableColumn from "./components/DroppableColumn";
import { initialColumns } from "./Column_data";

const App = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [nextItemId, setNextItemId] = useState(5);
  const [draggedItem, setDraggedItem] = useState(null);

  // 짝수 번 앞에 짝수 아이템 앞에 이동 불가능
  const isEven = (itemId) => {
    if (!itemId) return false;
    const itemNumber = parseInt(itemId, 10);
    return itemNumber % 2 === 0;
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragStart = useCallback((start) => {
    const { draggableId } = start;
    setDraggedItem(draggableId);
  }, []);

  const onDragEnd = useCallback(
    (result) => {
      const { source, destination } = result;
      setDraggedItem(null);
      if (!destination) {
        return;
      }

      // 첫 번째 컬럼에서 세 번째 컬럼으로의 이동을 막음
      if (source.droppableId === "col1" && destination.droppableId === "col3") {
        return;
      }

      const sourceCol = columns[source.droppableId];
      const destCol = columns[destination.droppableId];
      const draggedItemId = draggedItem;

      // 이동할 수 있는지 여부를 체크
      const draggedItemIsEven = isEven(draggedItemId);

      // 목적지에 짝수 아이템이 이미 있는지 확인
      const destContainsEvenItem = destCol.items.some((item) =>
        isEven(item.id)
      );

      // 짝수 아이템이 이동할 수 없는 경우
      if (
        draggedItemIsEven &&
        destContainsEvenItem &&
        destination.index <= source.index
      ) {
        return;
      }

      // 드래그된 아이템이 원래 컬럼으로 돌아가도록 처리
      if (source.droppableId === destination.droppableId) {
        const newItems = reorder(
          sourceCol.items,
          source.index,
          destination.index
        );

        setColumns((prevColumns) => ({
          ...prevColumns,
          [source.droppableId]: {
            ...sourceCol,
            items: newItems,
          },
        }));
      } else {
        const sourceItems = Array.from(sourceCol.items);
        const destItems = Array.from(destCol.items);
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);

        setColumns((prevColumns) => ({
          ...prevColumns,
          [source.droppableId]: {
            ...sourceCol,
            items: sourceItems,
          },
          [destination.droppableId]: {
            ...destCol,
            items: destItems,
          },
        }));
      }
    },
    [columns, draggedItem]
  );

  // 아이템 추가 버튼
  const addItemToColumn = () => {
    const newItem = {
      id: `${nextItemId}`,
      content: `item ${nextItemId}`,
    };

    setColumns((prevColumns) => ({
      ...prevColumns,
      col1: {
        ...prevColumns.col1,
        items: [...prevColumns.col1.items, newItem],
      },
    }));

    setNextItemId((prevId) => prevId + 1);
  };

  // 아이템 요소 스타일
  const getItemStyle = (isDragging, draggableId, source, destination) => {
    let bgColor = "bg-gray-300";

    if (isDragging) {
      bgColor = "bg-green-200";
    }

    if (draggedItem === draggableId) {
      if (
        !destination ||
        (source.droppableId === "col1" && destination === "col3")
      ) {
        bgColor = "bg-red-300";
      }
    }

    return `p-4 mb-2 rounded ${bgColor}`;
  };

  // 컬럼 스타일
  const getListStyle = (isDraggingOver) =>
    `p-4 ${isDraggingOver ? "bg-blue-100" : "bg-gray-200"} w-64`;

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div className="flex gap-4 p-4 overflow-x-auto max-w-full">
        <div className="flex space-x-4">
          {Object.entries(columns).map(([colId, colData]) => (
            <DroppableColumn
              key={colId}
              columnId={colId}
              columnData={colData}
              getListStyle={getListStyle}
              getItemStyle={(isDragging, draggableId, source, destination) =>
                getItemStyle(isDragging, draggableId, source, destination)
              }
              addItem={colId === "col1" ? addItemToColumn : undefined} // 첫 번째 컬럼에만 아이템 추가 기능 제공
            />
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default App;
