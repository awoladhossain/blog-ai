import { motion } from "framer-motion";
import { Input } from "./ui/input";

const SearchBox = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
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
          placeholder="Search..."
          className="h-9 rounded-full bg-input text-foreground border border-border focus:ring-2 focus:ring-primary"
        />
      </motion.div>
    </motion.form>
  );
};

export default SearchBox;
