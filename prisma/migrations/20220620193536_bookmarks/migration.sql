-- CreateTable
CREATE TABLE "_bookmarked" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_bookmarked_AB_unique" ON "_bookmarked"("A", "B");

-- CreateIndex
CREATE INDEX "_bookmarked_B_index" ON "_bookmarked"("B");

-- AddForeignKey
ALTER TABLE "_bookmarked" ADD CONSTRAINT "_bookmarked_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_bookmarked" ADD CONSTRAINT "_bookmarked_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
