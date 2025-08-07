"use client";
import "@radix-ui/themes/styles.css";
import { useState } from "react";
import { useContent, useSetLocale } from "../../contexts/LocaleContext";
import {
  Box,
  Text,
  Heading,
  Flex,
  Button,
  Separator,
  Card,
  Select,
} from "@radix-ui/themes";
import { useRouter } from "next/navigation";

type Locale = "ca-en" | "ca-fr";

export default function WelcomePage() {
  const content = useContent();
  const setLocale = useSetLocale();
  const {
    title,
    description,
    pdfListTitle,
    pdfItems,
    buttons,
    note,
    noteHeading,
  } = content.welcomePage;
  const router = useRouter();
  const [language, setLanguage] = useState("ca-en");

  const handleContinue = () => {
    router.push("/AccountSetup");
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    setLocale(value as Locale);
  };

  return (
    <Box
      p="4"
      style={{
        maxWidth: "1400px",
        height: "100%",
        margin: "0 auto",
        padding: "60px 50px 10px",
        backgroundColor: "#f5f6f8",
        fontFamily: "Heebo,Arial,sans-serif",
      }}
    >
      <Flex justify="end" mb="2">
        <Select.Root value={language} onValueChange={handleLanguageChange}>
          <Select.Trigger />
          <Select.Content>
            <Select.Item value="ca-en">English</Select.Item>
            <Select.Item value="ca-fr">Français</Select.Item>
          </Select.Content>
        </Select.Root>
      </Flex>
      <Heading
        style={{ fontFamily: "Heebo,Arial,sans-serif" }}
        as="h1"
        size="5"
        mb="3"
      >
        {title}
      </Heading>
      <Text as="p" mb="6">
        {description}
      </Text>
      <Card style={{ padding: "30px 24px", marginBottom: "24px" }}>
        <Heading as="h2" size="3" mb="3">
          {pdfListTitle}
        </Heading>
        <ul
          style={{
            listStyleType: "disc",
            paddingLeft: "20px",
            marginBottom: "24px",
            fontFamily: "Heebo,Arial,sans-serif",
          }}
        >
          {pdfItems.map((item, index) => (
            <li key={index} style={{ marginBottom: "8px", fontSize: "16px" }}>
              <Text>{item}</Text>
            </li>
          ))}
        </ul>
        <Flex gap="4" mb="4" style={{ flexWrap: "wrap" }}>
          <Button
            variant="outline"
            size="4"
            radius="large"
            className="responsive-button"
            style={{
              fontSize: "12px",
              padding: "14px 50px",
              borderRadius: "50px",
              fontFamily: "Heebo,Arial,sans-serif",
              fontWeight: "600",
              color: "#0074bd",
              border: "2px solid #0074bd",
              boxShadow: "none",
            }}
          >
            {buttons.cancel}
          </Button>
          <Button
            onClick={handleContinue}
            variant="outline"
            size="4"
            radius="large"
            className="responsive-button"
            style={{
              backgroundColor: "#0074bd",
              color: "#fff",
              fontSize: "12px",
              padding: "14px 50px",
              borderRadius: "50px",
              fontFamily: "Heebo,Arial,sans-serif",
              fontWeight: "600",
            }}
          >
            {buttons.continue}
          </Button>
        </Flex>
        <Separator orientation="horizontal" size="4" mb="3" />
        <Heading
          as="h4"
          size="2"
          mb="1"
          style={{ fontFamily: "Heebo,Arial,sans-serif" }}
        >
          {noteHeading}
        </Heading>
        <Text as="p" size="2" style={{ fontFamily: "Heebo,Arial,sans-serif" }}>
          {note}
        </Text>
      </Card>
    </Box>
  );
}
