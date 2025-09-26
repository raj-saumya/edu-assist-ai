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

interface SubjectSelectionDrawerProps {
  trigger: ReactNode;
}

const SubjectSelectionDrawer = ({ trigger }: SubjectSelectionDrawerProps) => {
  const [open, setOpen] = useState(false);

  const handleChapterSelect = (subject: string, chapter: string) => {
    console.log("Selected:", subject, chapter);
    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="bottom">
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="inset-y-auto inset-x-0 bottom-0 top-auto h-auto w-full rounded-t-[10px]">
        <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-6 mt-4" />
        <div className="p-6 pt-2">
          <Accordion type="single" defaultValue="item-0" collapsible>
            {SUBJECT_DATA.subjects.map((subject, index) => (
              <AccordionItem key={subject.subject} value={`item-${index}`}>
                <AccordionTrigger className="font-afacad text-lg font-medium">
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
                        className="font-afacad text-base text-left mb-2"
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
