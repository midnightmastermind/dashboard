import React, {Component} from 'react';
import styled, { css } from 'styled-components';
import { getUnixTime, setDate, eachWeekOfInterval, eachDayOfInterval, getDay, getDate, format, startOfWeek, startOfMonth, addMonths, addDays, endOfWeek, endOfMonth, isSameMonth, isSameDay, toDate, subMonths, getDaysInMonth} from "date-fns";
import { chunk } from 'lodash';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const days_of_the_week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


const Frame = styled.div`
    display: block;
    position: relative;
    width: 100%;
    background: transparent;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    box-shadow: 0 20px 30px rgba(0,0,0,0.5);
    transition: filter 2s;
    opacity: .6;
`;

const Header = styled.div`
     text-transform: uppercase;
     border-bottom: 1px solid var(--border-color);
`;

const Button = styled.div`
    cursor: pointer;
`;

const Body = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`;

const Day = styled.div`
    width: 14.2%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    ${props =>
        props.isToday &&
        css`
            border: 1px solid #eee;
        `}

    ${props =>
        props.isSelected &&
        css`
            background-color: #eee;
        `}
`;

const generateMonth = (selectedDate) => {
    const daysInMonth = getDaysInMonth(selectedDate);
    const startWeekday = getDay(startOfMonth(selectedDate));
    const endWeekday = getDay(endOfMonth(selectedDate));
    const gridDays = chunk([
      ...Array.from({ length: startWeekday }).fill(null),
      ...Array.from({ length: daysInMonth }, (_,i) => setDate(selectedDate, i+1)),
      ...Array.from({ length: (6-endWeekday) }).fill(null)
    ], 7);

    return gridDays;
  }

class Calendar extends Component {
    constructor(props) {
        super(props);

        const today = new Date();
        this.state = {
            currentMonth: new Date(),
            selectedDate: new Date()
        }
    }
    nextMonth = () => {
      this.setState({
        currentMonth: addMonths(this.state.currentMonth, 1)
      });
    };

    prevMonth = () => {
      this.setState({
        currentMonth: subMonths(this.state.currentMonth, 1)
      });
    };
    render() {
        const monthFormat = "MMMM yyyy";
        const weekdayFormat = "eeee";
        const { currentMonth, selectedDate } = this.state;
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);

        return (
            <Frame className="calendar">
                <Header className="header row flex-middle">
                    <div className="col col-start light-up">
                        <Button className="icon" onClick={this.prevMonth}>chevron_left</Button>
                    </div>
                    <div className="col col-center light-up">
                        <span>{format(this.state.currentMonth, monthFormat)}</span>
                    </div>
                    <div className="col col-end light-up">
                        <Button className="icon" onClick={this.nextMonth}>chevron_right</Button>
                    </div>
                </Header>
                <Body className="body">
                    { days_of_the_week.map(weekday => (
                        <Day className="col col-center light-up" key={weekday}>
                            {weekday}
                        </Day>
                    ))}
                    {   generateMonth(currentMonth).map((week, index) =>
                            (
                                <div className="row" key={index}>
                                    {
                                        week.map((day, index) => (
                                             day ? <Droppable key={getUnixTime(day)} droppableId={String(getUnixTime(day))}>
                                                {(provided, snapshot) => (
                                                    <Day className="col cell light-up" key={getUnixTime(day)}
                                                    isDraggingOver={snapshot.isDraggingOver}
                                                    ref={provided.innerRef}
                                                    {...provided.droppableProps}>
                                                            <span className="number light-up">{getDate(day)}</span>
                                                            <span className="bg light-up">{getDate(day)}</span>
                                                        </Day>
                                                    )}
                                                </Droppable> : <Day className="col cell light-up" key={index}>
                                                                    <span className="number light-up">{getDate(day)}</span>
                                                                    <span className="bg light-up">{getDate(day)}</span>
                                                                </Day>
                                ))
                                    }
                                </div>
                            )
                        )
                    }
                </Body>
            </Frame>
        )
    }
}

export default Calendar;
