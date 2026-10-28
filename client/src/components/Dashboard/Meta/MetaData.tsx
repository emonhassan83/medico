"use client";

import { useEffect } from "react";

type MetaProps = {
  title: string;
  description: string;
};

const Meta = ({ title, description }: MetaProps) => {
  useEffect(() => {
    document.title = title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", description);
  }, [title, description]);

  return null;
};

export default Meta;
