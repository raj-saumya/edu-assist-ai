import { useState } from "react";
import type { ReactNode } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "~/components/ui/drawer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import SUBJECT_DATA from "~/mock/subjectAccordian.mock.json";

type SubjectSelectionDrawerProps = {
  trigger: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const SubjectSelectionDrawer = ({ trigger, open: controlledOpen, onOpenChange }: SubjectSelectionDrawerProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = onOpenChange || setInternalOpen;

  const handleChapterSelect = (subject: string, chapter: string) => {
    console.log("Selected:", subject, chapter);
    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="bottom">
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="inset-y-auto inset-x-0 bottom-0 top-auto h-auto w-full rounded-t-[10px] bg-zinc-900 border-zinc-800">
        <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-700 mb-6 mt-4" />
        <div className="p-6 pt-2">
          <Accordion type="single" defaultValue="item-0" collapsible>
            {SUBJECT_DATA.subjects.map((subject, index) => (
              <AccordionItem key={subject.subject} value={`item-${index}`} className="border-zinc-800">
                <AccordionTrigger className="font-heading text-lg font-medium text-white hover:text-amber-400">
                  {subject.subject}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-2">
                    {subject.chapters.map((chapter) => (
                          <button
                            key={chapter}
                            onClick={() =>
                              handleChapterSelect(subject.subject, chapter)
                            }
                            className="text-base text-left mb-2 text-gray-300 hover:text-amber-400 transition-colors"
                          >
                        {chapter}
                      </button>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default SubjectSelectionDrawer;
