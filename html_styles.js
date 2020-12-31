var styles = {};

styles.default =
{
  "invoice_box": {
    "maxWidth": "800px",
    "margin": "auto",
    "padding": "30px",
    "border": "1px solid #eee",
    "boxShadow": "0 0 10px rgba(0, 0, 0, .15)",
    "fontSize": "16px",
    "lineHeight": "24px",
    "fontFamily": "'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif",
    "color": "#555"
  },
  "invoice_box_table": {
    "width": "100%",
    "lineHeight": "inherit",
    "textAlign": "left"
  },
  "invoice_box_table_td": {
    "padding": "5px",
    "verticalAlign": "top"
  },
  "invoice_box_table_tr_td_nth_child_2": {
    "textAlign": "right"
  },
  "invoice_box_table_tr_top_table_td": {
    "paddingBottom": "20px"
  },
  "invoice_box_table_tr_top_table_td_title": {
    "fontSize": "45px",
    "lineHeight": "45px",
    "color": "#333"
  },
  "invoice_box_table_tr_information_table_td": {
    "paddingBottom": "40px"
  },
  "invoice_box_table_tr_heading_td": {
    "background": "#eee",
    "borderBottom": "1px solid #ddd",
    "fontWeight": "bold"
  },
  "invoice_box_table_tr_details_td": {
    "paddingBottom": "20px"
  },
  "invoice_box_table_tr_item_td": {
    "borderBottom": "1px solid #eee"
  },
  "invoice_box_table_tr_item_last_td": {
    "borderBottom": "none"
  },
  "invoice_box_table_tr_total_td_nth_child_2": {
    "borderTop": "2px solid #eee",
    "fontWeight": "bold"
  },
  "@media only screen and (max-width: 600px)": {
    "__expression__": "only screen and (max-width: 600px)",
    "invoice_box_table_tr_top_table_td": {
      "width": "100%",
      "display": "block",
      "textAlign": "center"
    },
    "invoice_box_table_tr_information_table_td": {
      "width": "100%",
      "display": "block",
      "textAlign": "center"
    }
  },
  "rtl": {
    "direction": "rtl",
    "fontFamily": "Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif"
  },
  "rtl_table": {
    "textAlign": "right"
  },
  "rtl_table_tr_td_nth_child_2": {
    "textAlign": "left"
  }
};

exports.styles = styles;
