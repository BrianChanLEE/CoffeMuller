import React, {useEffect, useMemo, useRef, useState} from 'react';
import NoticeService from "../../services/Notice/Notice.Service";
import { useTable } from "react-table";

const NotiecesTable = (props) => {
    const [notices, setNotices] = useState([]);
    const [serchSubject, setSerchSubject] = useState("");
    const noticesRef = useRef();

    noticesRef.current = notices;

    useEffect(() => {
        retrieveNotices();
    }, []);

    const onChangeSearchSubject = (e) => {
        const serchSubject = e.target.value;
        setSerchSubject(serchSubject);
    };

    const retrieveNotices = () => {
        NoticeService.getAll()
            .then((response) => {
                setNotices(response.data);
            })
            .catch((e) => {
                console.log(e);
            })
    };
    const refreshList = () => {
        retrieveNotices();
    };

    const removeAllNotices = () => {
        NoticeService.removeAll()
            .then((response) => {
                console.log(response.data);
                refreshList();
            })
            .catch((e) => {
                console.log(e);
            })
    }

    const findBySubject = () => {
     NoticeService.findBySubject(serchSubject)
         .then((response) => {
             setNotices(response.data);
         })
         .catch((e) => {
             console.log(e);
         });
    };

    const openNotice = (rowIndex) => {
        const id = noticesRef.current[rowIndex].id;
        props.history.push("/notices/" + id);
    };

    const deleteNotice = (rowIndex) => {
        const id = noticesRef.current[rowIndex].id;
        NoticeService.remove(id)
            .then((response) => {
                props.history.push("/notices/");
                let newNotieces = [...noticesRef.current];
                newNotieces.splice(rowIndex, 1);
                setNotices(newNotieces);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const columns = useMemo(
        () => [
            {
                Header:"Subject",
                accessor:"subject",
            },
            {
                Header:"Contents",
                accessor:"contents",
            },
            {
                Header:"StartDate",
                accessor:"startDate",
            },
            {
                Header:"EndDate",
                accessor:"endDate",
            },
            {
                Header:"Status",
                accessor:"publisehd",
                Cell:(props) =>{
                    return props.value ? "Published" : "Pending";
                },
            },
            {
                Header:"Actions",
                accessor:"actions",
                Cell:(props) =>{
                    const rowIdx = props.row.id;
                    return(
                        <div>
                        <span onClick={() => openNotice(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>

                            <span onClick={() => deleteNotice(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
                        </div>
                    );
                },
            },
        ],
        []
    );
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data: notices,
    });

    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by title"
                        value={serchSubject}
                        onChange={onChangeSearchSubject}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findBySubject}
                        >
                            검색
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-12 list">
                <table
                    className="table table-striped table-bordered"
                    {...getTableProps()}
                >
                    <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>

            <div className="col-md-8">
                <button className="btn btn-sm btn-danger" onClick={removeAllNotices}>
                    전체 삭제
                </button>
            </div>
        </div>
    );
};


export default NotiecesTable