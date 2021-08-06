import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import React from "react";
import "./Card.css";

export default function StatusCard({
  title,
  isColor1,
  isColor2,
  isColor3,
  isColor4,
  cases,
  active,
  onClick,
  isDark,
}) {
  return (
    <Card
      onClick={onClick}
      className={`card ${isDark && "card--darkmode"} ${
        active && "card--selected"
      }
       ${isColor2 && "card--color2"}
      ${isColor3 && "card--color3"}
      ${isColor4 && "card--color4"}`}
    >
      <CardContent>
        <Typography
          className={`card_title ${isDark && "card--darkmode"}`}
          color="textSecondary"
        >
          {title}
        </Typography>
        <h2
          className={`
      ${isColor1 && "card_color1"}
      ${isColor2 && "card_color2"}
      ${isColor3 && "card_color3"}
      ${isColor4 && "card_color4"}`}
        >
          {cases}
        </h2>
      </CardContent>
    </Card>
  );
}
