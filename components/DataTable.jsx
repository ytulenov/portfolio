import { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Text, Box, useColorModeValue } from "@chakra-ui/react";
import * as XLSX from "xlsx";

export default function DataTable({ children, src }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [maxCols, setMaxCols] = useState(0);
  const [merges, setMerges] = useState([]);

  useEffect(() => {
    if (src?.endsWith(".xlsx")) {
      const baseUrl = process.env.NODE_ENV === "production"
        ? "https://ytulenov.com"
        : "http://localhost:3000";
      const absoluteSrc = src.startsWith("http") ? src : `${baseUrl}${src}`;

      fetch(absoluteSrc)
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
          return res.arrayBuffer();
        })
        .then((buffer) => {
          const workbook = XLSX.read(buffer, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];

          const sheetRange = XLSX.utils.decode_range(sheet["!ref"]);
          const maxCols = sheetRange.e.c + 1;
          setMaxCols(maxCols);

          const sheetMerges = sheet["!merges"] || [];
          setMerges(sheetMerges);

          const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" });
          const paddedData = jsonData.map((row) => {
            const paddedRow = Array(maxCols).fill("");
            row.forEach((cell, i) => {
              if (i < maxCols) paddedRow[i] = cell;
            });
            return paddedRow;
          });

          setData(paddedData);
          setError(null);
        })
        .catch((error) => {
          console.error("Error loading Excel file:", error);
          setError(`Failed to load Excel file: ${error.message}`);
        });
    }
  }, [src]);

  if (src?.endsWith(".xlsx")) {
    if (error) {
      return <Text color="red.500">{error}</Text>;
    }
    if (data.length === 0) {
      return <Text color="red.700">Loading Excel data...</Text>;
    }

  
    const headerRow = data[0];
    let rowSpanRemaining = Array(maxCols).fill(0);
    const headerCells = [];
    let c = 0;
    while (c < maxCols) {
      if (rowSpanRemaining[c] > 0) {
        rowSpanRemaining[c]--;
        c++;
        continue;
      }
      const merge = merges.find((m) => m.s.r === 0 && m.s.c === c);
      if (merge) {
        const colSpan = merge.e.c - merge.s.c + 1;
        const rowSpan = merge.e.r - merge.s.r + 1;
        const value = headerRow[c] || "";
        headerCells.push(
          <Th
            key={`0-${c}`}
            colSpan={colSpan}
            rowSpan={rowSpan}
            textAlign="center" 
            whiteSpace="nowrap"
            fontSize="md"
            color={useColorModeValue(process.env.NEXT_PUBLIC_DATATABLE_TEXT_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
            bg={useColorModeValue(process.env.NEXT_PUBLIC_DATATABLE_BG_LIGHT, process.env.NEXT_PUBLIC_DATATABLE_BG_DARK)}
            borderBottom="1px solid"
            borderColor={useColorModeValue(process.env.NEXT_PUBLIC_DATATABLE_TEXT_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
            borderRight="1px solid"
            fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}
            borderRightColor={useColorModeValue(process.env.NEXT_PUBLIC_DATATABLE_TEXT_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
            position="sticky"
            top="0"
            zIndex="1"
          >
            {value}
          </Th>
        );
        for (let sc = c; sc < c + colSpan; sc++) {
          rowSpanRemaining[sc] = rowSpan - 1;
        }
        c += colSpan;
      } else {
        const value = headerRow[c] || "";
        headerCells.push(
          <Th
            key={`0-${c}`}
            textAlign="center" 
            whiteSpace="nowrap"
            fontFamily={process.env.NEXT_PUBLIC_HEADING_H1_FONT}
            fontSize="md"
            color={useColorModeValue(process.env.NEXT_PUBLIC_DATATABLE_TEXT_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
            bg={useColorModeValue(process.env.NEXT_PUBLIC_DATATABLE_BG_LIGHT, process.env.NEXT_PUBLIC_DATATABLE_BG_DARK)}
            borderBottom="1px solid"
            borderColor={useColorModeValue(process.env.NEXT_PUBLIC_DATATABLE_TEXT_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
            borderRight="1px solid"
            borderRightColor={useColorModeValue(process.env.NEXT_PUBLIC_DATATABLE_TEXT_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
            position="sticky"
            top="0"
            zIndex="1" 
          >
            {value}
          </Th>
        );
        c++;
      }
    }

    
    const dataRows = data.slice(1);
    const tableRows = dataRows.map((row, r) => {
      const rowCells = [];
      let c = 0;
      while (c < maxCols) {
        if (rowSpanRemaining[c] > 0) {
          rowSpanRemaining[c]--;
          c++;
          continue;
        }
        const merge = merges.find((m) => m.s.r === r + 1 && m.s.c === c);
        if (merge) {
          const colSpan = merge.e.c - merge.s.c + 1;
          const rowSpan = merge.e.r - merge.s.r + 1;
          const value = row[c] || "";
          rowCells.push(
            <Td
              key={`${r + 1}-${c}`}
              colSpan={colSpan}
              rowSpan={rowSpan}
              fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
              textAlign="center" 
              whiteSpace="nowrap"
              color={useColorModeValue(process.env.NEXT_PUBLIC_DATATABLE_TEXT_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
              borderBottom="1px solid"
              borderColor={useColorModeValue(process.env.NEXT_PUBLIC_DATATABLE_TEXT_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
              borderRight="1px solid"
              borderRightColor={useColorModeValue(process.env.NEXT_PUBLIC_DATATABLE_TEXT_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
            >
              {value}
            </Td>
          );
          for (let sc = c; sc < c + colSpan; sc++) {
            rowSpanRemaining[sc] = rowSpan - 1;
          }
          c += colSpan;
        } else {
          const value = row[c] || "";
          rowCells.push(
            <Td
              key={`${r + 1}-${c}`}
              textAlign="center" 
              whiteSpace="nowrap"
              fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
              color={useColorModeValue(process.env.NEXT_PUBLIC_DATATABLE_TEXT_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
              borderBottom="1px solid"
              borderColor={useColorModeValue(process.env.NEXT_PUBLIC_DATATABLE_TEXT_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
              borderRight="1px solid"
              borderRightColor={useColorModeValue(process.env.NEXT_PUBLIC_DATATABLE_TEXT_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
            >
              {value}
            </Td>
          );
          c++;
        }
      }
      return <Tr key={r + 1}>{rowCells}</Tr>;
    });

    return (
      <Box
        my={4}
        maxW="100%"
        maxH="590px" 
        overflowX="auto"
        overflowY="auto"
        border="1px solid"
        borderColor={useColorModeValue(process.env.NEXT_PUBLIC_DATATABLE_TEXT_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
        borderRadius="2xl"
        p={4}
        fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
        bg={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
        boxShadow="sm"
      >
        <Table variant="simple" colorScheme="gray" sx={{ borderCollapse: "collapse" }}>
          <Thead>
            <Tr>{headerCells}</Tr>
          </Thead>
          <Tbody>{tableRows}</Tbody>
        </Table>
      </Box>
    );
  }

  
  return (
    <Box
      my={4}
      maxW="100%"
      maxH="590px"
      overflowX="auto"
      overflowY="auto"
      border="1px solid"
      fontFamily={process.env.NEXT_PUBLIC_HEADING_H2_FONT}
      borderColor={useColorModeValue(process.env.NEXT_PUBLIC_DATATABLE_TEXT_LIGHT, process.env.NEXT_PUBLIC_OVERALL_BG_DARK)}
      borderRadius="md"
      p={4}
      bg={useColorModeValue(process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_LIGHT, process.env.NEXT_PUBLIC_GENERAL_TEXT_HEADING_DARK)}
      boxShadow="sm"
    >
      <Table variant="simple" >
        <Tbody>{children}</Tbody>
      </Table>
    </Box>
  );
}