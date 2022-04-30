import {Pagination} from "react-bootstrap"
import "./pagination.scss"
import React, {useEffect, useMemo, useState} from "react";

const PaginationComponent: React.FC<{
    count: number,
    max: number,
    onChange: (page: number) => void,
    page: number
}> = ({
          count,
          max,
          onChange,
          page
      }): React.ReactElement => {
    const [{start, current}, setPaginationState] = useState({current: page, start: 0});

    const pages = useMemo(() => {
        return Array.from(Array(Math.ceil(count / max)).keys());
    }, [count, max]);

    useEffect(() => {
        onChange(current);
    }, [current])

    const getStart = (next: number): number => {
        if (next === pages.length - 2) {
            return pages.length - 5;
        }

        if (next >= start + 3) {
            return (next - 2) < (pages.length - 4) ? next - 2 : start;
        }

        if (next < start + 2) {
            return next - 2 < 0 ? 0 : next - 2;
        }

        return start;
    }

    useEffect(() => {
        if (current !== page || count) {
            setPaginationState({current: page, start: getStart(page)});
        }
    }, [page, count])

    useEffect(() => {
        setPaginationState({
            current: 0,
            start: 0
        });
    }, [count])

    const handleClick = (value: number): void => {
        setPaginationState({current: value, start: getStart(value)});
    };

    const prevPage = () => {
        if (current !== 0) {
            setPaginationState({current: current - 1, start: getStart(current - 1)});
        }
    };

    const nextPage = () => {
        if (current !== pages.length - 1) {
            setPaginationState({current: current + 1, start: getStart(current + 1)});
        }
    };

    return (
        <div className={"pagination-wr bold"}>
            <span className={"pointer"} onClick={prevPage}>Назад</span>
            <div className={"flex"}>
                {pages.length > 5 && start > 0 && <span>...</span>}
                <Pagination>
                    {pages.slice(start, start + 5).map(value => (
                        <Pagination.Item key={value} active={current === value}
                                         onClick={() => handleClick(value)}>{value + 1}</Pagination.Item>))}
                </Pagination>
                {pages.length > 5 && start + 5 < pages.length && <span>...</span>}
            </div>
            <span className={"pointer"} onClick={nextPage}>Далее</span>
        </div>
    )
}
export default PaginationComponent
