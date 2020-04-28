import React, {Component} from 'react';
import axios from 'axios';
import Calendar from "./calendar/Calendar";
import AddButton from './AddButton';
import ListContainer from './ListContainer';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const ListContainerElement = styled.div`
`;
class AppElement extends Component {
    constructor(props) {
            super(props);
            this.onDragEnd = this.onDragEnd.bind(this)
            this.state = {
                    lists:[]
            };
    }

    componentDidMount(){
        this.getLists();
    }

    getLists = () => {
        axios.get('/lists')
            .then(res => {
                if(res.data){
                    this.setState({
                        lists: res.data
                    })
                }
            })
            .catch(err => console.log(err))
    }

    onDragEnd = result => {
        const { destination, source, draggableId, type } = result;

        console.log(result);
        if (!destination) {
            return;
        }

        if (destination.droppableId == source.droppableId && destination.index == source.index) {
            return;
        }

        if(type == 'lists') {
            const movingListIndex = this.state.lists.findIndex(obj => obj._id == draggableId);
            const movingList = this.state.lists[movingListIndex]

            const newListsOrder = Array.from(this.state.lists)
            newListsOrder.splice(source.index, 1);
            newListsOrder.splice(destination.index, 0, movingList);
            console.log(newListsOrder)
            const newState = {
                ...this.state,
                lists: newListsOrder
            }
            this.setState(newState);
            return;
        }

        const startListIndex = this.state.lists.findIndex(obj => obj._id == source.droppableId);
        const startList = this.state.lists[startListIndex];

        const endListIndex = this.state.lists.findIndex(obj => obj._id == destination.droppableId);
        const endList = this.state.lists[endListIndex];

        if (startList == endList) {
            //same list
            const newTasks = Array.from(startList.tasks);
            const movingTask = startList.tasks[source.index];
            newTasks.splice(source.index, 1);
            newTasks.splice(destination.index, 0, movingTask);
            const newList = {
                ...startList,
                tasks: newTasks
            }

            const newLists = Array.from(this.state.lists);
            newLists[startListIndex] = newList
            const newState = {
                ...this.state,
                lists: newLists
            }
            this.setState(newState);
            return;
        }

        const startTasks = Array.from(startList.tasks);
        startTasks.splice(source.index, 1);

        const newStartList = {
            ...startList,
            tasks: startTasks
        }
        const movingTask = startList.tasks[source.index];
        const endTasks = Array.from(endList.tasks);
        endTasks.splice(destination.index, 0, movingTask);

        const newEndList = {
            ...endList,
            tasks: endTasks
        }

        const newLists = Array.from(this.state.lists);
        newLists[startListIndex] = newStartList
        newLists[endListIndex] = newEndList
        const newState = {
            ...this.state,
            lists: newLists
        }
        this.setState(newState);

    }
    render() {
        let { lists } = this.state;
        return (
            <div className="app-element">
                <DragDropContext
                    onDragEnd={this.onDragEnd}
                    >
                    <div className="top-container">
                        <div className="title">My Planner Application</div>
                    </div>

                    <div className="calendar-container">
                        <div className="calendar-header">Calendar</div>
                        <Calendar />
                    </div>
                    <Droppable
                        droppableId="all-lists"
                        direction="horizontal"
                        type="lists"
                        >
                        {provided => (
                            <ListContainerElement
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="list-container"
                                >
                                <div className="list-header">Tasks<AddButton getComponent={this.getLists} component="lists"/></div>
                                <div className="lists">
                                    {
                                        lists &&
                                            lists.length > 0 ?
                                                (
                                                    lists.map((list, index) => {
                                                        return (
                                                            <ListContainer key={list._id} list={list} index={index} getLists={this.getLists}/>
                                                        )
                                                    })
                                                )
                                                :
                                                (
                                                    <div className="none">No Lists Created</div>
                                                )
                                    }
                                </div>
                                {provided.placeholder}
                            </ListContainerElement>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        )
    }
}

export default AppElement;
