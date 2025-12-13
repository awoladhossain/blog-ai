import { RouteSearch } from "@/helpers/RouteName";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const getInput = (e) => {
    setQuery(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/app/blog/search?q=${query}`);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Input
          name="q"
          onInput={getInput}
          placeholder="Search..."
          className="h-9 rounded-full bg-input text-foreground border border-border focus:ring-2 focus:ring-primary"
        />
      </motion.div>
    </motion.form>
  );
};

export default SearchBox;
