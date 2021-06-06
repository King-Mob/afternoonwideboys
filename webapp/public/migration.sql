PGDMP         	                y           afternoonwideboys    12.2    12.2 ,    `           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            a           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            b           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            c           1262    46184    afternoonwideboys    DATABASE     �   CREATE DATABASE afternoonwideboys WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United Kingdom.1252' LC_CTYPE = 'English_United Kingdom.1252';
 !   DROP DATABASE afternoonwideboys;
                postgres    false            d           0    0    DATABASE afternoonwideboys    COMMENT     U   COMMENT ON DATABASE afternoonwideboys IS 'Local database for afternoonwideboys.com';
                   postgres    false    2915            �            1259    46251    Audios    TABLE     �   CREATE TABLE public."Audios" (
    "Id" bigint NOT NULL,
    "UserCreator" bigint NOT NULL,
    "Url" text NOT NULL,
    "Title" text NOT NULL,
    "Created" date NOT NULL
);
    DROP TABLE public."Audios";
       public         heap    postgres    false            �            1259    46211 	   ItemTypes    TABLE     y   CREATE TABLE public."ItemTypes" (
    "Id" bigint NOT NULL,
    "Name" text NOT NULL,
    "Description" text NOT NULL
);
    DROP TABLE public."ItemTypes";
       public         heap    postgres    false            �            1259    46206    Items    TABLE     �   CREATE TABLE public."Items" (
    "Id" bigint NOT NULL,
    "UserOwner" bigint NOT NULL,
    "Type" bigint NOT NULL,
    "Quantity" bigint NOT NULL
);
    DROP TABLE public."Items";
       public         heap    postgres    false            �            1259    46306    ItemsWithInfo    VIEW     �   CREATE VIEW public."ItemsWithInfo" AS
 SELECT "Items"."Id",
    "ItemTypes"."Name",
    "ItemTypes"."Description",
    "Items"."Quantity",
    "Items"."UserOwner"
   FROM public."Items",
    public."ItemTypes"
  WHERE ("Items"."Type" = "ItemTypes"."Id");
 "   DROP VIEW public."ItemsWithInfo";
       public          postgres    false    205    205    206    206    206    205    205            �            1259    46264    RelationshipTypes    TABLE     �   CREATE TABLE public."RelationshipTypes" (
    "Id" bigint NOT NULL,
    "Name" text NOT NULL,
    "Description" text NOT NULL
);
 '   DROP TABLE public."RelationshipTypes";
       public         heap    postgres    false            �            1259    46259    Relationships    TABLE     �   CREATE TABLE public."Relationships" (
    "Id" bigint NOT NULL,
    "UserFrom" bigint NOT NULL,
    "UserTo" bigint NOT NULL,
    "Type" bigint NOT NULL
);
 #   DROP TABLE public."Relationships";
       public         heap    postgres    false            �            1259    46198 	   RoleTypes    TABLE     y   CREATE TABLE public."RoleTypes" (
    "Id" bigint NOT NULL,
    "Name" text NOT NULL,
    "Description" text NOT NULL
);
    DROP TABLE public."RoleTypes";
       public         heap    postgres    false            �            1259    46193    Roles    TABLE     �   CREATE TABLE public."Roles" (
    "Id" bigint NOT NULL,
    "UserHaver" bigint NOT NULL,
    "Type" bigint NOT NULL,
    "TokenId" bigint NOT NULL
);
    DROP TABLE public."Roles";
       public         heap    postgres    false            �            1259    46294    Texts    TABLE     �   CREATE TABLE public."Texts" (
    "Id" bigint NOT NULL,
    "UserCreator" bigint NOT NULL,
    "Value" text NOT NULL,
    "Created" timestamp(3) without time zone
);
    DROP TABLE public."Texts";
       public         heap    postgres    false            �            1259    46185    Users    TABLE     �   CREATE TABLE public."Users" (
    "Id" bigint NOT NULL,
    "Name" text NOT NULL,
    "Email" text NOT NULL,
    "Password" text NOT NULL,
    "Created" date NOT NULL
);
    DROP TABLE public."Users";
       public         heap    postgres    false            e           0    0    TABLE "Users"    COMMENT     d   COMMENT ON TABLE public."Users" IS 'The table containing the basic user information for the site.';
          public          postgres    false    202            �            1259    46302    TextsWithCreators    VIEW     �   CREATE VIEW public."TextsWithCreators" AS
 SELECT "Users"."Id",
    "Users"."Name",
    "Texts"."Value",
    "Texts"."Created",
    "Texts"."UserCreator"
   FROM public."Users",
    public."Texts"
  WHERE ("Users"."Id" = "Texts"."UserCreator");
 &   DROP VIEW public."TextsWithCreators";
       public          postgres    false    213    213    213    202    202            �            1259    46227 
   TokenTypes    TABLE     z   CREATE TABLE public."TokenTypes" (
    "Id" bigint NOT NULL,
    "Name" text NOT NULL,
    "Description" text NOT NULL
);
     DROP TABLE public."TokenTypes";
       public         heap    postgres    false            �            1259    46219    Tokens    TABLE     r   CREATE TABLE public."Tokens" (
    "Id" bigint NOT NULL,
    "Type" bigint NOT NULL,
    "Value" text NOT NULL
);
    DROP TABLE public."Tokens";
       public         heap    postgres    false            �            1259    46243    Videos    TABLE     �   CREATE TABLE public."Videos" (
    "Id" bigint NOT NULL,
    "UserCreator" bigint NOT NULL,
    "Url" text NOT NULL,
    "Title" text NOT NULL,
    "Created" date NOT NULL
);
    DROP TABLE public."Videos";
       public         heap    postgres    false            Z          0    46251    Audios 
   TABLE DATA           R   COPY public."Audios" ("Id", "UserCreator", "Url", "Title", "Created") FROM stdin;
    public          postgres    false    210   @0       V          0    46211 	   ItemTypes 
   TABLE DATA           B   COPY public."ItemTypes" ("Id", "Name", "Description") FROM stdin;
    public          postgres    false    206   ]0       U          0    46206    Items 
   TABLE DATA           H   COPY public."Items" ("Id", "UserOwner", "Type", "Quantity") FROM stdin;
    public          postgres    false    205   �0       \          0    46264    RelationshipTypes 
   TABLE DATA           J   COPY public."RelationshipTypes" ("Id", "Name", "Description") FROM stdin;
    public          postgres    false    212   1       [          0    46259    Relationships 
   TABLE DATA           M   COPY public."Relationships" ("Id", "UserFrom", "UserTo", "Type") FROM stdin;
    public          postgres    false    211   11       T          0    46198 	   RoleTypes 
   TABLE DATA           B   COPY public."RoleTypes" ("Id", "Name", "Description") FROM stdin;
    public          postgres    false    204   N1       S          0    46193    Roles 
   TABLE DATA           G   COPY public."Roles" ("Id", "UserHaver", "Type", "TokenId") FROM stdin;
    public          postgres    false    203   �1       ]          0    46294    Texts 
   TABLE DATA           J   COPY public."Texts" ("Id", "UserCreator", "Value", "Created") FROM stdin;
    public          postgres    false    213   �1       X          0    46227 
   TokenTypes 
   TABLE DATA           C   COPY public."TokenTypes" ("Id", "Name", "Description") FROM stdin;
    public          postgres    false    208   3       W          0    46219    Tokens 
   TABLE DATA           9   COPY public."Tokens" ("Id", "Type", "Value") FROM stdin;
    public          postgres    false    207   t4       R          0    46185    Users 
   TABLE DATA           O   COPY public."Users" ("Id", "Name", "Email", "Password", "Created") FROM stdin;
    public          postgres    false    202   �4       Y          0    46243    Videos 
   TABLE DATA           R   COPY public."Videos" ("Id", "UserCreator", "Url", "Title", "Created") FROM stdin;
    public          postgres    false    209   �5       �
           2606    46258    Audios Audios_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Audios"
    ADD CONSTRAINT "Audios_pkey" PRIMARY KEY ("Id");
 @   ALTER TABLE ONLY public."Audios" DROP CONSTRAINT "Audios_pkey";
       public            postgres    false    210            �
           2606    46218    ItemTypes ItemTypes_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."ItemTypes"
    ADD CONSTRAINT "ItemTypes_pkey" PRIMARY KEY ("Id");
 F   ALTER TABLE ONLY public."ItemTypes" DROP CONSTRAINT "ItemTypes_pkey";
       public            postgres    false    206            �
           2606    46210    Items Items_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Items"
    ADD CONSTRAINT "Items_pkey" PRIMARY KEY ("Id");
 >   ALTER TABLE ONLY public."Items" DROP CONSTRAINT "Items_pkey";
       public            postgres    false    205            �
           2606    46271 (   RelationshipTypes RelationshipTypes_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public."RelationshipTypes"
    ADD CONSTRAINT "RelationshipTypes_pkey" PRIMARY KEY ("Id");
 V   ALTER TABLE ONLY public."RelationshipTypes" DROP CONSTRAINT "RelationshipTypes_pkey";
       public            postgres    false    212            �
           2606    46263     Relationships Relationships_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."Relationships"
    ADD CONSTRAINT "Relationships_pkey" PRIMARY KEY ("Id");
 N   ALTER TABLE ONLY public."Relationships" DROP CONSTRAINT "Relationships_pkey";
       public            postgres    false    211            �
           2606    46205    RoleTypes RoleTypes_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."RoleTypes"
    ADD CONSTRAINT "RoleTypes_pkey" PRIMARY KEY ("Id");
 F   ALTER TABLE ONLY public."RoleTypes" DROP CONSTRAINT "RoleTypes_pkey";
       public            postgres    false    204            �
           2606    46197    Roles Roles_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_pkey" PRIMARY KEY ("Id");
 >   ALTER TABLE ONLY public."Roles" DROP CONSTRAINT "Roles_pkey";
       public            postgres    false    203            �
           2606    46301    Texts Texts_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Texts"
    ADD CONSTRAINT "Texts_pkey" PRIMARY KEY ("Id");
 >   ALTER TABLE ONLY public."Texts" DROP CONSTRAINT "Texts_pkey";
       public            postgres    false    213            �
           2606    46234    TokenTypes TokenTypes_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."TokenTypes"
    ADD CONSTRAINT "TokenTypes_pkey" PRIMARY KEY ("Id");
 H   ALTER TABLE ONLY public."TokenTypes" DROP CONSTRAINT "TokenTypes_pkey";
       public            postgres    false    208            �
           2606    46226    Tokens Tokens_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Tokens"
    ADD CONSTRAINT "Tokens_pkey" PRIMARY KEY ("Id");
 @   ALTER TABLE ONLY public."Tokens" DROP CONSTRAINT "Tokens_pkey";
       public            postgres    false    207            �
           2606    46192    Users Users_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("Id");
 >   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_pkey";
       public            postgres    false    202            �
           2606    46250    Videos Videos_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Videos"
    ADD CONSTRAINT "Videos_pkey" PRIMARY KEY ("Id");
 @   ALTER TABLE ONLY public."Videos" DROP CONSTRAINT "Videos_pkey";
       public            postgres    false    209            Z      x������ � �      V   n   x�ʱ!���9)��vH��3���1Bl���RqXSmK2����7�aј�@)�Ķ�+O34�42i#�e��_�U*<�d`tO\AE�.�R7�4��s�-j+�      U   )   x�3�4A.cNN# m��|C.NSȊ���� v��      \      x������ � �      [      x������ � �      T   -   x�3�-N-�tT��/�M�Q(���J2R�3KR��b���� ���      S   -   x��� 0�wn�J@�e����p(,I]_��7W�����{�d      ]   �  x����n�0���S��S	Q��2��À=�.Y"�n��dy��A�-n2����������͐�,�t�����?d9����J�rϊ$�dT���B���)K�����O���F�I�do�a���{��r�y|-g�׏<i@��6�l���wUr�?��
n��9��p��r,r���n�ƤB��1�����Y�e��Yn�0�m��x#r���TN�K��PV��D2"<"bBDd`޵��;!�g�@��X��I ^��1�zp�������}��������a:���W���p����
e9�8����Gw-����X@�����<�~���eg5��7<��'��Zn<|�GL��"׏��u�
���.o,}T��:�,�������[��XNk�X�����v%�<�X�0�S�޾�M��'?@�Da�      X   �   x����n�0�g�)� ������ea%�,K�(��ۗ�e$��n�w����-~�B�J(B9b!��)� 6�E���Tc1�A����t�tD�	�vg�$�J�3�Q�#󜲃LL��v#�S7��֯ⶖ��W��4\�%�C��ў��*���/4#\0:l%�E'e̋S:(:��x��෮>��6��>�wpH8�$������ӡ\      W   u   x��1
�@D�zu�`��䱤2U�Hc���]��OT|�HAY�m�^����Y<�������zs����(4)��ۏ�\iN�$]"�F��Q��y#K`�`Ϳ�\Ы��      R   �   x�m�A� Dן����▸�n>�
���'��^%&v�ff1�Mhqm�f��pWؐ��laC�	ى���];<��)Υb����@꾢_�Jl���.~Yv�J#�>����H&��qٓ2��d܎�� ��w�q����=%      Y      x������ � �     