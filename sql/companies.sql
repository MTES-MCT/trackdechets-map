-- Requête SQL permettant de récupérer la liste des entreprises et leur profils

SELECT
    siret,
    name,
    CASE WHEN 'WASTEPROCESSOR' = any("t"."companyType") THEN 'Installation de traitement'
        WHEN 'COLLECTOR' = any("t"."companyType") THEN 'Collecteur-regroupeur'
        WHEN 'TRANSPORTER' = any("t"."companyType") THEN 'Transporteur'
        WHEN 'PRODUCER' = any("t"."companyType") THEN 'Producteur'
        WHEN 'TRADER' = any("t"."companyType") THEN 'Négociant'
        WHEN 'ECO_ORGANISME' = any("t"."companyType") THEN 'Éco-organisme'
        ELSE 'Inconnu'
    END as category
FROM (
    SELECT "default$default"."Company"."siret" AS "siret", "default$default"."Company"."name" AS "name", "CompanyTypes"."ctype" AS "companyType"
    FROM "default$default"."Company"
    LEFT JOIN (SELECT "nodeId", array_agg(value) as ctype  FROM "default$default"."Company_companyTypes" GROUP BY "nodeId") as "CompanyTypes" ON "default$default"."Company"."id" = "CompanyTypes"."nodeId"
) as t
