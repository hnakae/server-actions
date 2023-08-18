-- CreateEnum
CREATE TYPE "Color" AS ENUM ('black', 'white');

-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameAnalysis" (
    "id" SERIAL NOT NULL,
    "game_info_id" INTEGER NOT NULL,

    CONSTRAINT "GameAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameInfo" (
    "id" SERIAL NOT NULL,
    "game_type" INTEGER NOT NULL,
    "file_format" INTEGER NOT NULL,
    "board_size" INTEGER NOT NULL,
    "black_player" TEXT NOT NULL,
    "black_rank" TEXT NOT NULL,
    "white_player" TEXT NOT NULL,
    "white_rank" TEXT NOT NULL,
    "komi" INTEGER NOT NULL,
    "game_result" TEXT NOT NULL,
    "game_date" TEXT NOT NULL,
    "game_name" TEXT NOT NULL,

    CONSTRAINT "GameInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerState" (
    "id" SERIAL NOT NULL,
    "capture_count" INTEGER NOT NULL,
    "stone_count" INTEGER NOT NULL,
    "group_count" INTEGER NOT NULL,
    "liberty_count" INTEGER NOT NULL,
    "cluster_count" INTEGER NOT NULL,

    CONSTRAINT "PlayerState_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoneAction" (
    "id" SERIAL NOT NULL,
    "step" INTEGER NOT NULL,
    "color" "Color" NOT NULL,
    "coordinate" INTEGER NOT NULL,
    "captured_stones" INTEGER[],
    "game_analysis_id" INTEGER NOT NULL,
    "player_state_id" INTEGER NOT NULL,

    CONSTRAINT "StoneAction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GameAnalysis" ADD CONSTRAINT "GameAnalysis_game_info_id_fkey" FOREIGN KEY ("game_info_id") REFERENCES "GameInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoneAction" ADD CONSTRAINT "StoneAction_game_analysis_id_fkey" FOREIGN KEY ("game_analysis_id") REFERENCES "GameAnalysis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoneAction" ADD CONSTRAINT "StoneAction_player_state_id_fkey" FOREIGN KEY ("player_state_id") REFERENCES "PlayerState"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
