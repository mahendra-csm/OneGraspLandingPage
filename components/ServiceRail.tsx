import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


interface Service {
  id: string;
  index: string;
  title: string;
  desc: string;
  imageUrl: string;
}

interface Props {
  services: Service[];
  onSelect: (id: string) => void;
}

export default function ServiceRail({ services, onSelect }: Props) {
 const [active, setActive] = useState(services[0]);
  return (
    <section className="py-40 bg-white overflow-hidden">
      <div className="container mx-auto px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-24 items-center">

          {/* LEFT – SERVICE LIST */}
          <div className="space-y-10">
            <p className="text-gray-400 uppercase tracking-widest text-sm">
              Choose a path
            </p>

            {services.map((s) => {
              const isActive = s.id === active.id;

              return (
                <motion.div
                  key={s.id}
                  onMouseEnter={() => setActive(s)}
                  onClick={() => onSelect(s.id)}
                  className="cursor-pointer"
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0.45,
                    x: isActive ? 0 : -10,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className="flex items-start gap-6">
                    <span className="text-sm text-gray-300 font-bold">
                      {s.index}
                    </span>

                    <div>
                      <h3
                        className={`text-4xl font-black transition-colors ${
                          isActive ? "text-blue-600" : "text-gray-900"
                        }`}
                      >
                        {s.title}
                      </h3>
                      <p className="text-gray-500 mt-2 max-w-md">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* RIGHT – VISUAL CANVAS */}
          <div className="relative h-[520px] rounded-[4rem] overflow-hidden shadow-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${active.imageUrl})` }}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
