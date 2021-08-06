import React from "react";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
const inrformat = require("inrformat");

const headerColumns = [
  { id: "state", label: "State", align: "left" },
  { id: "code", label: "StateCode", align: "center" },
  {
    id: "active",
    label: "Active",

    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "confirmed",
    label: "Confirmed",

    align: "center",
    format: (value) => value.toLocaleString("en-IN"),
  },
  {
    id: "recovered",
    label: "Recovered",
    align: "center",
    format: (value) => value.toLocaleString("en-IN"),
  },
  {
    id: "deaths",
    label: "Deceased",
    align: "center",
    format: (value) => value.toLocaleString("en-IN"),
  },
];

export default function StateInfoTable({ states, isDark }) {
  const useStyles = makeStyles({
    tablecontainer: {
      backgroundColor: `${isDark ? "black" : "white"}`,
      borderRadius: 10,
      boxShadow: "0 0 8px -4px rgba(0, 0, 0, 0.6)",
      marginBottom: 10,
      marginTop: 10,
      height: 600,
    },
    oddRow: {
      backgroundColor: `${isDark ? "#424242" : "#f3f2f8"}`,
    },
    evenRow: {
      backgroundColor: `${isDark ? "#616161" : "#bdbdbd"}`,
    },
    cellOfROw: isDark
      ? { borderRadius: 15, border: 0, color: "white" }
      : { borderRadius: 15, border: 0, color: "black" },
  });

  const classes = useStyles();

  let i = 0;
  return (
    <TableContainer className={classes.tablecontainer}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {headerColumns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={
                  isDark
                    ? { backgroundColor: "#1f1f1f", color: "white", border: 0 }
                    : {}
                }
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {states.map((state) => {
            return (
              <TableRow
                key={Math.random() / Math.random()}
                className={i++ % 2 ? classes.oddRow : classes.evenRow}
              >
                <TableCell
                  key={state.state}
                  align="left"
                  className={classes.cellOfROw}
                >
                  {state.state}
                </TableCell>
                <TableCell
                  key={state.statecode}
                  align="center"
                  className={classes.cellOfROw}
                >
                  {state.statecode}
                </TableCell>
                <TableCell
                  key={Math.random() / Math.random()}
                  align="center"
                  className={classes.cellOfROw}
                >
                  {inrformat(state.active)}
                </TableCell>
                <TableCell
                  key={Math.random() / Math.random()}
                  align="center"
                  className={classes.cellOfROw}
                >
                  {inrformat(state.confirmed)}
                </TableCell>
                <TableCell
                  key={Math.random() / Math.random()}
                  align="center"
                  className={classes.cellOfROw}
                >
                  {inrformat(state.recovered)}
                </TableCell>
                <TableCell
                  key={Math.random() / Math.random()}
                  align="center"
                  className={classes.cellOfROw}
                >
                  {inrformat(state.deaths)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
