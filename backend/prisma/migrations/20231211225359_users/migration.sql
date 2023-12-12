-- CreateEnum
CREATE TYPE "ProfileType" AS ENUM ('employee', 'client');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nome" TEXT,
    "cpf" TEXT NOT NULL,
    "telefone" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "profile" "ProfileType" NOT NULL DEFAULT 'client',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movie" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "classification" TEXT NOT NULL,
    "synopsis" TEXT NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "qtd_max" INTEGER NOT NULL,
    "typeExhibitionAccepted" TEXT NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "idRoom" INTEGER NOT NULL,
    "idMovie" INTEGER NOT NULL,
    "exibitionType" TEXT NOT NULL,
    "dublingType" TEXT NOT NULL,
    "atualTicketsQtd" INTEGER NOT NULL,
    "maxTicketsQtd" INTEGER NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "idUser" INTEGER NOT NULL,
    "idSession" INTEGER NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Session_idRoom_idx" ON "Session"("idRoom");

-- CreateIndex
CREATE INDEX "Session_idMovie_idx" ON "Session"("idMovie");

-- CreateIndex
CREATE INDEX "Ticket_idSession_idx" ON "Ticket"("idSession");

-- CreateIndex
CREATE INDEX "Ticket_idUser_idx" ON "Ticket"("idUser");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_idRoom_fkey" FOREIGN KEY ("idRoom") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_idMovie_fkey" FOREIGN KEY ("idMovie") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_idSession_fkey" FOREIGN KEY ("idSession") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
