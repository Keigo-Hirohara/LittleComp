-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "Story"("id") ON DELETE CASCADE ON UPDATE CASCADE;
