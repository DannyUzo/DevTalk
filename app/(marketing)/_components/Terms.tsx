import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const Terms = () => (
  <Drawer>
    <DrawerTrigger asChild>
      <Button variant="ghost" size="sm">
        Terms & Conditions
      </Button>
    </DrawerTrigger>
    <DrawerContent className="p-2">
      <div className="mx-auto max-h-[680px] shrink overflow-y-scroll md:overflow-hidden sm:h-full w-full max-w-lg flex flex-col gap-y-2">
        <DrawerHeader>
          <DrawerTitle className="font-sans font-2xl">Terms & Conditions</DrawerTitle>
          <DrawerDescription>Guide lines to using DevTalk</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col justify-evenly">
          <div className="p-5 flex flex-col">
            <h1 className="font-bold font-sans">◽Language Policy:</h1>
            <p className="text-base dark:text-muted-foreground">
              Avoid the use of foul language, offensive remarks, or any form of
              inappropriate content. Maintain a respectful and positive tone in
              all discussions.
            </p>
          </div>
          <div className="p-5 flex flex-col">
            <h1 className="font-bold font-sans">◽Accuracy and Truthfulness:</h1>
            <p className="text-base dark:text-muted-foreground">
              Provide information that is accurate, truthful, and reliable.
              Steer clear of misleading content to maintain the trust of your
              readers.
            </p>
          </div>
          <div className="p-5 flex flex-col">
            <h1 className="font-bold font-sans">◽Relevance:</h1>
            <p className="text-base dark:text-muted-foreground">
              Ensure that the content stays relevant to the blog&apos;s theme and
              purpose. Avoid posting irrelevant or off-topic material.
            </p>
          </div>
          <Separator />
          <div className="p-5 flex flex-col">
            <h1 className="font-bold text-red-400 font-sans">Consequences of Violation:</h1>
            <p className="text-base dark:text-muted-foreground">
              Violation of these guidelines may result in the removal of
              content. Repeat offenses could lead to account restrictions or
              other actions.
            </p>
          </div>
        </div>
        <DrawerClose asChild>
          <Button>I understand and agree</Button>
        </DrawerClose>
      </div>
    </DrawerContent>
  </Drawer>
);
