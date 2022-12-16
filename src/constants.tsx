import { styled } from '@mui/material/styles';


export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export const defaultQuery = `/* Quack */

WITH customer_agg AS (
    SELECT
        d.year,
        d.month_name,
        d.month,
        c.country,
        e.customer_id,
        COUNT(1) AS email_sends_cnt,
        SUM(email_opens_cnt) AS email_opens_cnt,
        MAX(email_opens_cnt) AS max_email_opens
    FROM emails_sent_fact e
    LEFT JOIN date_dimension d
        ON e.date_id = d.id
    LEFT JOIN customer_dimension c
        ON e.customer_id = c.id
    GROUP BY
        d.year,
        d.month_name,
        d.month,
        c.country,
        e.customer_id
),
country_agg AS (
    SELECT
        year,
        month_name,
        month,
        country,
        SUM(email_sends_cnt) AS email_sends_cnt,
        COUNT(
            CASE
                WHEN email_sends_cnt >= 1 THEN customer_id
                ELSE NULL
            END
        ) AS num_customers_sends_1,
        SUM(email_opens_cnt) AS email_opens_cnt,
        MAX(max_email_opens) AS max_email_opens
    FROM customer_agg
    GROUP BY
        year,
        month_name,
        month,
        country
)

SELECT
    year,
    month_name,
    month,
    country,
    max_email_opens,
    SUM(email_opens_cnt) OVER (
        PARTITION BY
            country
        ORDER BY
            year,
            month
    ) AS email_opens_cumulative,
    num_customers_sends_1
FROM country_agg
ORDER BY
    country,
    year,
    month
;   
`;